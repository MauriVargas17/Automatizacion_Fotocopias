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

exports.getAllRequests = async (req, res) => {
  try {
    const allRequests = await Request.find();
    res.status(200).json({
      status: 'success',
      results: allRequests.length,
      requestedAt: res.requestTime,
      data: {
        allRequests,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error,
    });
  }
};