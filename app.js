var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userCourse = require ('./routes/course');
var userStudent = require ('./routes/student');
var userAdmission = require ('./routes/admission');
var userPayment = require ('./routes/payment');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/course',userCourse);
app.use('/student',userStudent);
app.use('/admission',userAdmission);
app.use('/payment',userPayment);


module.exports = app;
