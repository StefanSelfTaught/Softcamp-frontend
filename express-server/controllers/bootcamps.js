const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
module.exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     Get a signle bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
module.exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bootcamp = await Bootcamp.findById(id)
    .populate('courses')
    .populate('reviews')

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc     Get bootcamp own by user
// @route    GET /api/v1/bootcamps/ownedBootcamps
// @access   Private
module.exports.getOwnBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  if(!req.user) {
    return next(
      new ErrorResponse('No user is logged in!', 404)
    )
  }

  const bootcamp = await Bootcamp.find({ user: id });

  if (!bootcamp.length) {
    res.status(200).json({
      success: true,
      data: null,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: bootcamp[0],
  });
});

// @desc     Create new bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private
module.exports.createBootcamp = asyncHandler(async (req, res, next) => {

  const bootcampData = JSON.parse(req.body.bootcampData);

  bootcampData.user = req.user.id;

  const publishedBootcamp = await Bootcamp.findOne({
    user: req.user.id,
  });

  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with id ${req.user.id} has already published a bootcamp`, 400
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 404));
  }

  const file = req.files.file;

  // Check file type ( should be image )
  if (!file.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse('Please upload an image file', 404),
    );
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        404,
      ),
    );
  }

  file.name = `photo_${file.md5}${path.parse(file.name).ext}`;

  bootcampData.photo = file.name;

  const bootcamp = await Bootcamp.create(bootcampData);

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/${file.name}`,
    async err => {
      if (err) {
        return next(
          new ErrorResponse(`Problem with file upload`, 500),
        );
      }
    },
  );

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc     Update bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
module.exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let bootcamp = await Bootcamp.findById(id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${id}`,
        404,
      ),
    );
  }

  // Make sure user is bootcamp ownwer
  if (
    bootcamp.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc     Delete bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
module.exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bootcamp = await Bootcamp.findById(id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${id}`,
        404,
      ),
    );
  }

  if (
    bootcamp.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this bootcamp`,
        401,
      ),
    );
  }

  await bootcamp.deleteOne();

  res.status(200).json({ success: true, data: null });
});

// @desc     Get bootcamps within a radius
// @route    PUT /api/v1/bootcamps/radius/:zipcode/:distance
// @access   Private
module.exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/long from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mil / 6 378 km
  const radius = distance / 6378;
  
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[long, lat], radius] },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc     Upload photo for bootcamp
// @route    PUT /api/v1/bootcamps/:id/photo
// @access   Private
module.exports.bootcampPhotoUpload = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;

    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${id}`,
          404,
        ),
      );
    }

    if (
      bootcamp.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to update this bootcamp`,
          401,
        ),
      );
    }

    if (!req.files) {
      return next(
        new ErrorResponse('Please upload a file', 404),
      );
    }

    const file = req.files.file;

    // Check file type ( should be image )
    if (!file.mimetype.startsWith('image')) {
      return next(
        new ErrorResponse('Please upload an image file', 404),
      );
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          404,
        ),
      );
    }

    // Create costum filename

    file.name = `photo_${bootcamp._id}${
      path.parse(file.name).ext
    }`;

    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/${file.name}`,
      async err => {
        if (err) {
          return next(
            new ErrorResponse(`Problem with file upload`, 500),
          );
        }

        await Bootcamp.findByIdAndUpdate(id, {
          photo: file.name,
        });

        res.status(200).json({
          success: true,
          data: file.name,
        });
      },
    );
  },
);
