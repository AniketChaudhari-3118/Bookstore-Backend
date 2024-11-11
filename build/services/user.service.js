"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
//create new user
var newUser = exports.newUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(userDetails) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("user details----------- ", userDetails);
          _context.next = 3;
          return _user["default"].create(userDetails);
        case 3:
          data = _context.sent;
          console.log("After database operation----------- ", userDetails);
          return _context.abrupt("return", data);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function newUser(_x) {
    return _ref.apply(this, arguments);
  };
}();