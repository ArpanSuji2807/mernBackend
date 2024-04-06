const mongoose = require('mongoose');
const db = mongoose.connect(process.env.BASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;