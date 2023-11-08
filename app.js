var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { responseEnhancer } = require("express-response-formatter");

var userRouter = require("./router/UserRouter");
var sensorRouter = require("./router/SensorRouter");
var branchRouter = require("./router/BranchRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add formatter functions to "res" object via "responseEnhancer()"
app.use(responseEnhancer());

// routers
app.use(userRouter);
app.use(sensorRouter);
app.use(branchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/*
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const branchController = require('../controllers/BranchController');
const deliveryCatController = require('../controllers/DeliveryCatController');
const productController = require('../controllers/ProductController');
const relationController = require('../controllers/RelationController');
const sensorController = require('../controllers/SensorController');
const transactionController = require('../controllers/TransactionController');
const unitController = require('../controllers/TransactionController');
const userController = require('../controllers/UserController');
const vendorController = require('../controllers/VendorController');

const createRoute = require('./genericRouter');

const routes = [
  {
    path: '/branch/push-dataset',
    controller: branchController,
  },
  {
    path: '/branch/push-dataset',
    controller: deliveryCatController,
  },
  {
    path: '/branch/push-dataset',
    controller: productController,
  },
  {
    path: '/branch/push-dataset',
    controller: relationController,
  },
  {
    path: '/branch/push-dataset',
    controller: sensorController,
  },
  {
    path: '/branch/push-dataset',
    controller: transactionController,
  },
  {
    path: '/branch/push-dataset',
    controller: unitController,
  },
  {
    path: '/branch/push-dataset',
    controller: userController,
  },
  {
    path: '/branch/push-dataset',
    controller: vendorController,
  }
];

// Create routes using the generic router
routes.forEach((route) => {
  app.use(route.path, createRoute(route.controller, route.path));
});
 */