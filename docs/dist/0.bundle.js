(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/getKeyboardList.js":
/*!********************************!*\
  !*** ./src/getKeyboardList.js ***!
  \********************************/
/*! exports provided: tempkeyboardList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tempkeyboardList\", function() { return tempkeyboardList; });\nvar tempkeyboardList = [];\nfetch('https://api.qmk.fm/v1/keyboards').then(function (response) {\n  if (!response.ok) {\n    throw new Error('Response not success.');\n  }\n\n  return response.text();\n}).then(function (data) {\n  tempkeyboardList = data.split(',');\n  console.log('モジュール処理');\n  console.log(tempkeyboardList);\n  return tempkeyboardList;\n})[\"catch\"](function (error) {\n  return tempkeyboardList;\n});\n\n\n//# sourceURL=webpack:///./src/getKeyboardList.js?");

/***/ })

}]);