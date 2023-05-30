const Request = require('../models/requestModel');

exports.postRequest = async (req, res) => {
  try {
    const newRequest = await Request.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        request: newRequest,
      },
    });
  } catch (error) {
    res.status(500).json({
      stauts: 'failed',
      message: error,
    });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Request deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      stauts: 'failed',
      message: error,
    });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: res.requestTime,
      data: {
        request,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.getRequestsByDate = async (req, res) => {
  try {
    console.log(req.params.date);
    const date = req.params.date;
    //const regex = /\b(0[1-9]|1[0-2])-(\d{4})\b/;
    const regex = `^.*${date}$`;

    // const match = '06-2023'.match(regex0);
    // console.log(match[0]);
    const query = Request.find({
      pickUpDate: {
        // $regex: `^${req.params.month}$`,
        $regex: regex,
        $options: 'i',
      },
      // pickUpDate: req.params.month,
    });

    const requests = await query;

    res.status(200).json({
      status: 'success',
      results: requests.length,
      requestedAt: res.requestTime,
      data: {
        requests,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    console.log(req.query);
    const queryObj = { ...req.query };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    const query = Request.find(JSON.parse(queryStr));

    const requests = await query;

    res.status(200).json({
      status: 'success',
      results: requests.length,
      requestedAt: res.requestTime,
      data: {
        requests,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error,
    });
  }
};
