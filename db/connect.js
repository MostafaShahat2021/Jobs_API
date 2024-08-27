const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    const connectionInstance = await mongoose.connect(url);
    console.log(
      `MongoDB Connected ! \nDB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log('MongoDB Connection error ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
