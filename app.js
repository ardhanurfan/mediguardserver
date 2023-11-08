var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { responseEnhancer } = require("express-response-formatter");

var branchRouter = require('./router/BranchRouter');
var deliveryCatRouter = require('./router/DeliveryCatRouter');
var productRouter = require('./router/ProductRouter');
var relationRouter = require('./router/RelationRouter');
var sensorRouter = require('./router/SensorRouter');
var transactionRouter = require('./router/TransactionRouter');
var unitRouter = require('./router/UnitRouter'); 
var userRouter = require('./router/UserRouter');
var vendorRouter = require('./router/VendorRouter');

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
app.use(deliveryCatRouter);
app.use(sensorRouter);
app.use(branchRouter);
app.use(productRouter);
app.use(relationRouter);
app.use(transactionRouter);
app.use(unitRouter);
app.use(vendorRouter);

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