const crypto = require('crypto');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const sendEmail = require('../utils/sendEmail.js');
const ErrorResponse = require('../utils/errorResponse');

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public
module.exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		return next(new ErrorResponse('This email already exists!', 400));
	}

	const user = await User.create({
		name,
		email,
		password,
		role
	});

	sendUserInfoResponse(user, 200, res);
});

// @desc     Login user
// @route    POST /api/v1/auth/login
// @access   Public
module.exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email & password
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide an email and a password', 400)
		);
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	sendUserInfoResponse(user, 200, res);
});

// @desc     Get current logged in user
// @route    POST /api/v1/auth/me
// @access   Private
module.exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	const { _id, role, name, created, email } = user;

	res.status(200).json({
		success: true,
		id: _id,
		role,
		name,
		created,
		email
	});
});

// @desc     Log user out / clear cookie
// @route    GET /api/v1/auth/logout
// @access   Private
module.exports.logout = asyncHandler(async (req, res, next) => {
	res.clearCookie('token', { httpOnly: true });

	return res.status(200).json({
		success: true,
		data: {}
	});
});

// @desc     Update user details
// @route    POST /api/v1/auth/updatedetails
// @access   Private
module.exports.updateDetails = asyncHandler(async (req, res, next) => {

	const fieldsToUpdate = {
		name: req.body.name,
		email: req.body.email
	};

	const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
		new: true,
		runValidators: true
	});

	const { _id, role, created, name, email } = user;

	res.status(200).json({
		success: true,
		id: _id,
		role,
		name,
		created,
		email
	});
});

// @desc     Update password
// @route    PUT /api/v1/auth/updatepassword
// @access   Private
module.exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	if (!(await user.matchPassword(req.body.currentPassword))) {
		next(new ErrorResponse('Password is incorrect', 401));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendUserInfoResponse(user, 200, res);
});

// @desc     Forgot password
// @route    POST /api/v1/auth/forgotpassword
// @access   Public
module.exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(
			new ErrorResponse(`There is no user with email ${req.body.email}`, 404)
		);
	}

	const resetToken = user.getResetPasswordToken();

	const message = (
		`Access this link to reset your password: http://localhost:3000/reset-password/${resetToken}`
	)

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message
		});

		res.status(200).json({
			success: true,
			data: 'Email sent'
		});
	} catch (err) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}

	await user.save({ validateBeforeSave: false });
});

// @desc     Reset Password
// @route    PUT /api/v1/auth/resetpassword/:resettoken
// @access   Public
module.exports.resetPassword = asyncHandler(async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendUserInfoResponse(user, 200, res);
});

// Get token from model & create cookie and send response
const sendUserInfoResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();

	const { _id, role, name, created, email } = user;

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res
		.status(statusCode)
		.cookie('token', token, options)
		.json({
			success: true,
			id: _id,
			role,
			name,
			created,
			email,
		});
};
