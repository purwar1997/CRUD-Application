const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

exports.connect = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URL);
    console.log(`Database connected: ${connection.connection.host}`);
  } catch (err) {
    console.log('Database connection failure');
    console.log(err.message);
    process.exit(1);
  }
};
