const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
    console.log(
      'Database connected',
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnect;
