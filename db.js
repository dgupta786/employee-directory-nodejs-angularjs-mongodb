var mongoose = require('mongoose');
var chalk = require('chalk')

var dbURI = process.env.DB_STRING || 'mongodb://DeepakGupta:abcd12345@ds019698.mlab.com:19698/employee_directory';

//var dbURI = 'mongodb://127.0.0.1:27017/mongodb'

//mongo ds019698.mlab.com:19698/employee_directory -u DeepakGupta -p abcd@12345

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function (err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
    console.log(chalk.red('Mongoose disconnected'));
});

var employeeSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    DOB: { type: Date },
    department: { type: String },
    gender: { type: String },
});


mongoose.model('Employee', employeeSchema);