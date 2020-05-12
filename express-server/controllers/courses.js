const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc     Get courses
// @route    GET /api/v1/courses
// @route    GET /api/v1/bootcamps/:bootcampId/courses
// @access   Public
module.exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({
      bootcamp: req.params.bootcampId,
    });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc     Get a single course
// @route    GET /api/v1/courses/:id
// @access   Public
module.exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.id}`,
        400,
      ),
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc     Add course
// @route    POST /api/v1/bootcamps/:bootcampId/courses
// @access   Private
module.exports.addCourse = asyncHandler(async (req, res, next) => {

  const { bootcampId } = req.params;
  const { id, role } = req.user;

  req.body.forEach(course => {
    course.bootcamp = bootcampId
    course.user = id;
  })

  const bootcamp = await Bootcamp.findById(
    bootcampId,
  );

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${bootcampId}`,
        400,
      ),
    );
  }

  if (
    bootcamp.user.toString() !== id &&
    role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${id} is not authorized to add a course`,
        401,
      ),
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc     Update course
// @route    PUT /api/v1/courses/:id
// @access   Private
module.exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.id}`,
        400,
      ),
    );
  }

  if (
    course.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course`,
        401,
      ),
    );
  }

  course.save();

  course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc     Delete course
// @route    DELETE /api/v1/courses/:id
// @access   Private
module.exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.id}`,
        400,
      ),
    );
  }

  if (
    course.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete a course`,
        401,
      ),
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
