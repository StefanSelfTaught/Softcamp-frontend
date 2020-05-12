const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please provide a title for the review'],
		maxlength: 100
	},
	text: {
		type: String,
		required: [true, 'Please provide a review text']
	},
	rating: {
		type: Number,
		min: 1,
		max: 10,
		required: [true, 'Please provide a rating between 1 and 10']
	},
	bootcamp: {
		type: mongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Prevent user for submitting more than 1 review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

ReviewSchema.statics.getAverageRating = async function(bootcampId) {
	const obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId }
		},
		{
			$group: {
				_id: '$bootcamp',
				averageRating: { $avg: '$rating' }
			}
		}
	]);

	try {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageRating: obj[0].averageRating
		});
	} catch (error) {
		console.log(error);
	}
};

ReviewSchema.post('save', async function() {
	await this.constructor.getAverageRating(this.bootcamp);
});

ReviewSchema.pre('remove', { query: true }, async function() {
	await this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', ReviewSchema);
