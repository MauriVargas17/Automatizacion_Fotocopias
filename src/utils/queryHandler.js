class QueryHandler {
  constructor(queryObject, queryBody) {
    this.queryObject = queryObject;
    this.queryBody = queryBody;
  }

  filter() {
    const queryObj = { ...this.queryBody };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.queryObject = this.queryObject.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryBody.sort) {
      const sortBy = this.queryBody.sort.split(',').join(' ');
      this.queryObject = this.queryObject.sort(sortBy);
    } else {
      this.queryObject = this.queryObject.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryBody.fields) {
      const fields = this.queryBody.fields.split(',').join(' ');
      this.queryObject = this.queryObject.select(fields);
    } else {
      this.queryObject = this.queryObject.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryBody.page * 1 || 1;
    const resultsPerPage = this.queryBody.limit * 1 || 100;
    const skip = (page - 1) * resultsPerPage; //How many results are we skipping

    this.queryObject = this.queryObject.skip(skip).limit(resultsPerPage);

    return this;
  }
}

module.exports = QueryHandler;
