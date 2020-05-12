const mongoose = require('mongoose');
require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err.message.red);
    throw Error('Could not connect to database!');
  }
};

module.exports = connectDB;