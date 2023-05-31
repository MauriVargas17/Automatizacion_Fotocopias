const Request = require('../models/requestModel');
const QueryHandler = require('../utils/queryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const planMaker = async function (req, lBoundary, uBoundary) {
  const date = req.params.date.split('-').reverse().join('');
  console.log('Boundaries', date + lBoundary, date + uBoundary);
  const plan = await Request.aggregate([
    {
      $match: {
        date: {
          $gte: date + lBoundary,
          $lte: date + uBoundary,
        },
      },
    },
    {
      $group: {
        _id: {
          pointInTime: {
            $substr: ['$date', uBoundary.length === 4 ? 4 : 6, 2],
          },
        },
        totalRequests: { $sum: 1 },
        totalPaperSheetsUsed: {
          $sum: { $multiply: ['$numberOfPages', '$numberOfCopies'] },
        },
        requesters: { $push: '$user' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return plan;
};

exports.postRequest = async (req, res) => {
  try {
    const newRequest = await Request.create({
      user: req.body.user,
      faculty: req.body.faculty,
      fileName: req.body.fileName,
      fileSize: req.body.fileSize,
      numberOfCopies: req.body.numberOfCopies,
      numberOfPages: req.body.numberOfPages,
      pickUpDate: req.body.pickUpDate,
      pickUpTime: req.body.pickUpTime,
      date: req.body.pickUpDate.split('-').reverse().join(''),
      isColoured: req.body.isColoured,
      isRinged: req.body.isRinged,
      isFrontAndBack: req.body.isFrontAndBack,
      specifications: req.body.specifications,
    });

    newRequest.date = undefined;
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
    const regex = `^.*${date}$`;
    const query = Request.find({
      pickUpDate: {
        $regex: regex,
        $options: 'i',
      },
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

exports.getAllRequests = catchAsync(async (req, res, next) => {
  const queryHandler = new QueryHandler(Request.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const requests = await queryHandler.queryObject;

  res.status(200).json({
    status: 'success',
    results: requests.length,
    requestedAt: res.requestTime,
    data: {
      requests,
    },
  });
});

exports.getRequestsStats = catchAsync(async (req, res, next) => {
  const stats = await Request.aggregate([
    {
      $match: { numberOfCopies: { $gte: 1 } },
    },
    {
      $group: {
        _id: '$faculty',
        totalRequests: { $sum: 1 },
        totalPaperSheetsUsed: {
          $sum: { $multiply: ['$numberOfCopies', '$numberOfPages'] },
        },
        avgCopiesPerRequest: { $avg: '$numberOfCopies' },
        avgPagesPerRequest: { $avg: '$numberOfPages' },
        minPagesInARequest: { $min: '$numberOfPages' },
        maxPagesInARequest: { $max: '$numberOfPages' },
        minCopiesInARequest: { $min: '$numberOfCopies' },
        maxCopiesInARequest: { $max: '$numberOfCopies' },
      },
    },
    {
      $sort: { totalPaperSheetsUsed: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    requestedAt: res.requestTime,
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const plan = await planMaker(req, '01', '31');

  res.status(200).json({
    status: 'success',
    requestedAt: res.requestTime,
    data: {
      timeFrame: 'Month',
      pointInTime: 'Day',
      plan,
    },
  });
});

exports.getYearlyPlan = catchAsync(async (req, res, next) => {
  const plan = await planMaker(req, '0101', '1231');

  res.status(200).json({
    status: 'success',
    requestedAt: res.requestTime,
    data: {
      timeFrame: 'Year',
      pointInTime: 'Month',
      plan,
    },
  });
});
