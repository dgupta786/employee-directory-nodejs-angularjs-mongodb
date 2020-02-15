var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');


exports.employees = function (req, res) {
    Employee.find({}, function (err, employees) {
        if (!err) {
            res.json({ code: 0, data: employees })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while retriving employees data" })
        }
    });
}

exports.addEmployee = function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var DOB = req.body.DOB;
    var department = req.body.department;
    var gender = req.body.gender;

    console.log("add Employee :",req.body)

    var newEmployee = new Employee();
    newEmployee.name = name
    newEmployee.email = email
    newEmployee.DOB = DOB
    newEmployee.department = department
    newEmployee.gender = gender


    newEmployee.save(function (err, savedStory) {
        if (err) {
            console.log("Error : While saving the Employee Data",err);
            res.json({ code: 1, message: "Error while saving the employee Data" })
        } else {
            res.json({ code: 0, data: savedStory })
        }
    });
}

exports.getEmployee = function (req, res) {
    var id = req.params.id;
    Employee.findOne({ _id: id }, function (err, employee) {
        if (!err) {
            res.json({ code: 0, data: employee })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while retriving employee data" })
        }
    });
}

exports.deleteEmployee = function (req, res) {
    var id = req.params.id;
    Employee.findOneAndDelete({ _id: id }, function (err, data) {
        if (!err) {
            res.json({ code: 0, data: data })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while deleting employee data" })
        }
    });
}

exports.updateEmployee = function (req, res) {
    var id = req.params.id;
    Employee.findOneAndUpdate({ _id: id }, req.body, { useFindAndModify: false }, function (err, data) {
        if (!err) {
            res.json({ code: 0, data: data })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while updating employee data" })
        }
    });
}
