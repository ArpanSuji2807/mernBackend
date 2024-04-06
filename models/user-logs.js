const mongoose = require('mongoose')

const userLogsSchema = mongoose.Schema({
    action: { type: Object, required: true },
    date: { type: Date, required: true , default: Date.now },
});

// const UserLogs = db.model('UserLogs', userLogsSchema);

// module.exports = UserLogs;