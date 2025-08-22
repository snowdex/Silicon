const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
            console.log('✅ Database connected successfully');
        });
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

module.exports = { connectDB };