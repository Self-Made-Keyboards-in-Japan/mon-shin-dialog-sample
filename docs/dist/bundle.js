/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/formdata-polyfill/formdata.min.js":
/*!********************************************************!*\
  !*** ./node_modules/formdata-polyfill/formdata.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {;(function(){var h;function l(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}var m=\"function\"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};\nfunction n(a){a=[\"object\"==typeof globalThis&&globalThis,a,\"object\"==typeof window&&window,\"object\"==typeof self&&self,\"object\"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error(\"Cannot find global object\");}var p=n(this);function r(a,c){if(c){for(var b=p,d=a.split(\".\"),e=0;e<d.length-1;e++){var f=d[e];f in b||(b[f]={});b=b[f]}d=d[d.length-1];e=b[d];f=c(e);f!=e&&null!=f&&m(b,d,{configurable:!0,writable:!0,value:f})}}\nr(\"Symbol\",function(a){function c(e){if(this instanceof c)throw new TypeError(\"Symbol is not a constructor\");return new b(\"jscomp_symbol_\"+(e||\"\")+\"_\"+d++,e)}function b(e,f){this.o=e;m(this,\"description\",{configurable:!0,writable:!0,value:f})}if(a)return a;b.prototype.toString=function(){return this.o};var d=0;return c});\nr(\"Symbol.iterator\",function(a){if(a)return a;a=Symbol(\"Symbol.iterator\");for(var c=\"Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array\".split(\" \"),b=0;b<c.length;b++){var d=p[c[b]];\"function\"===typeof d&&\"function\"!=typeof d.prototype[a]&&m(d.prototype,a,{configurable:!0,writable:!0,value:function(){return u(l(this))}})}return a});function u(a){a={next:a};a[Symbol.iterator]=function(){return this};return a}\nfunction v(a){var c=\"undefined\"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):{next:l(a)}}var w;if(\"function\"==typeof Object.setPrototypeOf)w=Object.setPrototypeOf;else{var y;a:{var z={u:!0},A={};try{A.__proto__=z;y=A.u;break a}catch(a){}y=!1}w=y?function(a,c){a.__proto__=c;if(a.__proto__!==c)throw new TypeError(a+\" is not extensible\");return a}:null}var B=w;function C(){this.h=!1;this.f=null;this.m=void 0;this.b=1;this.l=this.v=0;this.g=null}\nfunction D(a){if(a.h)throw new TypeError(\"Generator is already running\");a.h=!0}C.prototype.i=function(a){this.m=a};C.prototype.j=function(a){this.g={w:a,A:!0};this.b=this.v||this.l};C.prototype[\"return\"]=function(a){this.g={\"return\":a};this.b=this.l};function E(a,c){a.b=3;return{value:c}}function F(a){this.a=new C;this.B=a}F.prototype.i=function(a){D(this.a);if(this.a.f)return G(this,this.a.f.next,a,this.a.i);this.a.i(a);return H(this)};\nfunction I(a,c){D(a.a);var b=a.a.f;if(b)return G(a,\"return\"in b?b[\"return\"]:function(d){return{value:d,done:!0}},c,a.a[\"return\"]);a.a[\"return\"](c);return H(a)}F.prototype.j=function(a){D(this.a);if(this.a.f)return G(this,this.a.f[\"throw\"],a,this.a.i);this.a.j(a);return H(this)};\nfunction G(a,c,b,d){try{var e=c.call(a.a.f,b);if(!(e instanceof Object))throw new TypeError(\"Iterator result \"+e+\" is not an object\");if(!e.done)return a.a.h=!1,e;var f=e.value}catch(g){return a.a.f=null,a.a.j(g),H(a)}a.a.f=null;d.call(a.a,f);return H(a)}function H(a){for(;a.a.b;)try{var c=a.B(a.a);if(c)return a.a.h=!1,{value:c.value,done:!1}}catch(b){a.a.m=void 0,a.a.j(b)}a.a.h=!1;if(a.a.g){c=a.a.g;a.a.g=null;if(c.A)throw c.w;return{value:c[\"return\"],done:!0}}return{value:void 0,done:!0}}\nfunction J(a){this.next=function(c){return a.i(c)};this[\"throw\"]=function(c){return a.j(c)};this[\"return\"]=function(c){return I(a,c)};this[Symbol.iterator]=function(){return this}}function K(a,c){var b=new J(new F(c));B&&B(b,a.prototype);return b}\nif(\"undefined\"!==typeof Blob&&(\"undefined\"===typeof FormData||!FormData.prototype.keys)){var L=function(a,c){for(var b=0;b<a.length;b++)c(a[b])},M=function(a,c,b){return c instanceof Blob?[String(a),c,void 0!==b?b+\"\":\"string\"===typeof c.name?c.name:\"blob\"]:[String(a),String(c)]},N=function(a,c){if(a.length<c)throw new TypeError(c+\" argument required, but only \"+a.length+\" present.\");},O=function(a){var c=v(a);a=c.next().value;var b=c.next().value;c=c.next().value;b instanceof Blob&&(b=new File([b],\nc,{type:b.type,lastModified:b.lastModified}));return[a,b]},P=\"object\"===typeof globalThis?globalThis:\"object\"===typeof window?window:\"object\"===typeof self?self:this,Q=P.FormData,R=P.XMLHttpRequest&&P.XMLHttpRequest.prototype.send,S=P.Request&&P.fetch,T=P.navigator&&P.navigator.sendBeacon,U=P.Element&&P.Element.prototype,V=P.Symbol&&Symbol.toStringTag;V&&(Blob.prototype[V]||(Blob.prototype[V]=\"Blob\"),\"File\"in P&&!File.prototype[V]&&(File.prototype[V]=\"File\"));try{new File([],\"\")}catch(a){P.File=function(c,\nb,d){c=new Blob(c,d);d=d&&void 0!==d.lastModified?new Date(d.lastModified):new Date;Object.defineProperties(c,{name:{value:b},lastModifiedDate:{value:d},lastModified:{value:+d},toString:{value:function(){return\"[object File]\"}}});V&&Object.defineProperty(c,V,{value:\"File\"});return c}}var W=function(a){this.c=[];var c=this;a&&L(a.elements,function(b){if(b.name&&!b.disabled&&\"submit\"!==b.type&&\"button\"!==b.type&&!b.matches(\"form fieldset[disabled] *\"))if(\"file\"===b.type){var d=b.files&&b.files.length?\nb.files:[new File([],\"\",{type:\"application/octet-stream\"})];L(d,function(e){c.append(b.name,e)})}else\"select-multiple\"===b.type||\"select-one\"===b.type?L(b.options,function(e){!e.disabled&&e.selected&&c.append(b.name,e.value)}):\"checkbox\"===b.type||\"radio\"===b.type?b.checked&&c.append(b.name,b.value):(d=\"textarea\"===b.type?b.value.replace(/\\r\\n/g,\"\\n\").replace(/\\n/g,\"\\r\\n\"):b.value,c.append(b.name,d))})};h=W.prototype;h.append=function(a,c,b){N(arguments,2);this.c.push(M(a,c,b))};h[\"delete\"]=function(a){N(arguments,\n1);var c=[];a=String(a);L(this.c,function(b){b[0]!==a&&c.push(b)});this.c=c};h.entries=function c(){var b,d=this;return K(c,function(e){1==e.b&&(b=0);if(3!=e.b)return b<d.c.length?e=E(e,O(d.c[b])):(e.b=0,e=void 0),e;b++;e.b=2})};h.forEach=function(c,b){N(arguments,1);for(var d=v(this),e=d.next();!e.done;e=d.next()){var f=v(e.value);e=f.next().value;f=f.next().value;c.call(b,f,e,this)}};h.get=function(c){N(arguments,1);var b=this.c;c=String(c);for(var d=0;d<b.length;d++)if(b[d][0]===c)return O(b[d])[1];\nreturn null};h.getAll=function(c){N(arguments,1);var b=[];c=String(c);L(this.c,function(d){d[0]===c&&b.push(O(d)[1])});return b};h.has=function(c){N(arguments,1);c=String(c);for(var b=0;b<this.c.length;b++)if(this.c[b][0]===c)return!0;return!1};h.keys=function b(){var d=this,e,f,g,k,q;return K(b,function(t){1==t.b&&(e=v(d),f=e.next());if(3!=t.b){if(f.done){t.b=0;return}g=f.value;k=v(g);q=k.next().value;return E(t,q)}f=e.next();t.b=2})};h.set=function(b,d,e){N(arguments,2);b=String(b);var f=[],g=M(b,\nd,e),k=!0;L(this.c,function(q){q[0]===b?k&&(k=!f.push(g)):f.push(q)});k&&f.push(g);this.c=f};h.values=function d(){var e=this,f,g,k,q,t;return K(d,function(x){1==x.b&&(f=v(e),g=f.next());if(3!=x.b){if(g.done){x.b=0;return}k=g.value;q=v(k);q.next();t=q.next().value;return E(x,t)}g=f.next();x.b=2})};W.prototype._asNative=function(){for(var d=new Q,e=v(this),f=e.next();!f.done;f=e.next()){var g=v(f.value);f=g.next().value;g=g.next().value;d.append(f,g)}return d};W.prototype._blob=function(){for(var d=\n\"----formdata-polyfill-\"+Math.random(),e=[],f=v(this),g=f.next();!g.done;g=f.next()){var k=v(g.value);g=k.next().value;k=k.next().value;e.push(\"--\"+d+\"\\r\\n\");k instanceof Blob?e.push('Content-Disposition: form-data; name=\"'+g+'\"; filename=\"'+k.name+'\"\\r\\nContent-Type: '+((k.type||\"application/octet-stream\")+\"\\r\\n\\r\\n\"),k,\"\\r\\n\"):e.push('Content-Disposition: form-data; name=\"'+g+'\"\\r\\n\\r\\n'+k+\"\\r\\n\")}e.push(\"--\"+d+\"--\");return new Blob(e,{type:\"multipart/form-data; boundary=\"+d})};W.prototype[Symbol.iterator]=\nfunction(){return this.entries()};W.prototype.toString=function(){return\"[object FormData]\"};U&&!U.matches&&(U.matches=U.matchesSelector||U.mozMatchesSelector||U.msMatchesSelector||U.oMatchesSelector||U.webkitMatchesSelector||function(d){d=(this.document||this.ownerDocument).querySelectorAll(d);for(var e=d.length;0<=--e&&d.item(e)!==this;);return-1<e});V&&(W.prototype[V]=\"FormData\");if(R){var X=P.XMLHttpRequest.prototype.setRequestHeader;P.XMLHttpRequest.prototype.setRequestHeader=function(d,e){X.call(this,\nd,e);\"content-type\"===d.toLowerCase()&&(this.s=!0)};P.XMLHttpRequest.prototype.send=function(d){d instanceof W?(d=d._blob(),this.s||this.setRequestHeader(\"Content-Type\",d.type),R.call(this,d)):R.call(this,d)}}S&&(P.fetch=function(d,e){e&&e.body&&e.body instanceof W&&(e.body=e.body._blob());return S.call(this,d,e)});T&&(P.navigator.sendBeacon=function(d,e){e instanceof W&&(e=e._asNative());return T.call(this,d,e)});P.FormData=W};\n})();\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/formdata-polyfill/formdata.min.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n__webpack_require__(/*! formdata-polyfill */ \"./node_modules/formdata-polyfill/formdata.min.js\"); // 匿名関数を即時実行\n\n\n(function () {\n  //------------------------------------------------------------------------------------------\n  // clipboard.js\n  //-----------------------------------------------------------------------------------------\n  // Tooltip \n  $('#copyBtn').tooltip({\n    trigger: 'click',\n    placement: 'bottom'\n  });\n\n  function setTooltip(message) {\n    $('#copyBtn').tooltip('hide').attr('data-original-title', message).tooltip('show');\n  }\n\n  function hideTooltip() {\n    setTimeout(function () {\n      $('#copyBtn').tooltip('hide');\n    }, 1000);\n  } // Clipboard \n\n\n  var clipboard = new ClipboardJS('#copyBtn');\n  clipboard.on('success', function (e) {\n    setTooltip('Copied!');\n    hideTooltip();\n  });\n  clipboard.on('error', function (e) {\n    setTooltip('Failed!');\n    hideTooltip();\n  }); // フォーム要素を取得する\n\n  var form = document.getElementById(\"questionForm\"); // リアルタイムで投稿文を作成するため \"input\" イベントに割り当て\n\n  form.addEventListener(\"input\", function (e) {\n    // console.log('change form value');\n    //------------------------------------------------------------------------------------------\n    //投稿文作成機能\n    //-----------------------------------------------------------------------------------------\n    var nameToQuestion = new Map([['keyboardName', 'キーボード名'], ['microcontroller', 'マイコンの種類'], ['connection', 'PCとキーボードの接続方法'], ['keyboardForm', 'キーボードの形状'], ['socket', 'キースイッチ用のソケットの使用状況'], ['wiring', '配線方法'], ['keyInputProblem', 'キー入力関連の問題'], ['noInput', 'キーを押しても反応しない'], ['noInputTextarea', '反応しないキーの説明'], ['notExpect', '設定と異なるキーが入力される'], ['notExpectTextarea', '設定と異なるキーの状況'], ['notActionOneHand', '左右分離型で片方だけ反応しない'], ['notActionOneHandTextarea', '左右のどちらをPCに接続しているか、左右のどちらが反応しないか。'], ['ledOff', 'LEDが点灯しない'], ['ledOffTextarea', '点灯しないledの箇所'], ['writeErrorQmk', 'ファームウェアを書き込めない'], ['writingToolLog', 'ファームウェア書き込みツールのログ'], ['otherProblem', '上記以外の問題（トラックボールが動かない、ランドが剥がれた etc）'], ['otherProblemTextarea', '問題の内容'], ['osName', 'OS名'], ['windowsVersionInput', 'Windowsのバージョン'], ['windowsTerminalSoftInput', 'Windowsのターミナルソフト'], ['macosVersionInput', 'MacOSのバージョン'], ['linuxDistributionInput', 'Linuxのディストリビューション'], ['keyboardLayout', 'OS側のキーボードの配列認識'], ['writingTool', '書き込みツール'], ['situation', '不具合が発生する時の状況'], ['detail', 'これまでに行った作業の内容'], ['firmwareWritingLog', 'ファームウェア書き込み時のログ'], ['testProMicroOnly', 'コンスルー（スプリングピンヘッダ）を利用している場合、基板から Pro Micro を取り外して Pro Micro だけ USB 接続した場合にキーボードとして認識されますか？'], ['haveTester', 'テスターを持っていますか？']]); // FormData オブジェクトを作成する\n\n    var form_data = new FormData(form); // 出力テスト\n    // console.log(form_data);\n    // for (let value of form_data.keys()) { \n    // \tif (nameToQuestion.has(value)) {\n    //     console.log(nameToQuestion.get(value) + ': ' + form_data.get(value));\n    // \t}\n    // }\n    // テキストボックスに投稿文を作成\n\n    var postsText = document.getElementById(\"postsText\");\n    postsText.value = '';\n\n    var _iterator = _createForOfIteratorHelper(form_data.keys()),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var key = _step.value;\n\n        if (nameToQuestion.has(key)) {\n          // console.log(key);\n          if (key === 'writingToolLog') {\n            var userText = '【' + nameToQuestion.get(key) + '】\\n```\\n' + form_data.get(key) + '\\n```';\n            postsText.value += userText + \"\\n\\n\";\n          } else {\n            var _userText = '【' + nameToQuestion.get(key) + '】\\n' + form_data.get(key);\n\n            postsText.value += _userText + \"\\n\\n\";\n          }\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n\n    if (postsText.scrollHeight > postsText.clientHeight) {\n      postsText.style.height = postsText.scrollHeight + \"px\";\n    } //------------------------------------------------------------------------------------------\n    // ラジオボックスとテキストエリアの連動機能\n    //-----------------------------------------------------------------------------------------\n    // ユーザーの操作で値が変化したフォームの要素を取得\n\n\n    var target = e.target;\n    console.log('e.target: ' + e.target);\n\n    if (target.name == \"microcontroller\") {\n      if (target.id !== \"microcontrollerNameInput\") {\n        document.getElementById(\"microcontrollerNameInput\").disabled = true;\n      } else if (target.name == \"microcontroller\" && target.id == \"microcontrollerNameInput\") {\n        document.getElementById(\"microcontrollerNameInput\").disabled = false;\n      }\n    }\n\n    if (target.name === \"osName\") {\n      if (target.id == \"windows\") {\n        document.getElementById(\"windowsVersionInput\").disabled = false;\n        document.getElementById(\"windowsTerminalSoftInput\").disabled = false;\n        document.getElementById(\"macosVersionInput\").disabled = true;\n        document.getElementById(\"linuxDistributionInput\").disabled = true;\n      } else if (target.id == \"macos\") {\n        document.getElementById(\"windowsVersionInput\").disabled = true;\n        document.getElementById(\"windowsTerminalSoftInput\").disabled = true;\n        document.getElementById(\"macosVersionInput\").disabled = false;\n        document.getElementById(\"linuxDistributionInput\").disabled = true;\n      } else if (target.id == \"linux\") {\n        document.getElementById(\"windowsVersionInput\").disabled = true;\n        document.getElementById(\"windowsTerminalSoftInput\").disabled = true;\n        document.getElementById(\"macosVersionInput\").disabled = true;\n        document.getElementById(\"linuxDistributionInput\").disabled = false;\n      }\n    } //------------------------------------------------------------------------------------------\n    // チェックボックスとテキストエリアの連動機能\n    //-----------------------------------------------------------------------------------------\n    // console.log(e.target.dataset.relationTextarea);\n\n\n    if (e.target.dataset.relationTextarea) {\n      // console.log(e.target.dataset.relationTextarea);\n      var relationTextarea = e.target.dataset.relationTextarea;\n\n      if (e.target.checked) {\n        document.getElementById(relationTextarea).disabled = false;\n      } else {\n        document.getElementById(relationTextarea).disabled = true;\n      }\n    } //------------------------------------------------------------------------------------------\n    // 質問同士のチェック連動機能\n    //-----------------------------------------------------------------------------------------\n\n\n    if (e.target.name === \"microcontroller\") {\n      if (e.target.id == \"atmega32u4\" || e.target.id == \"atmega328\" || e.target.id == \"othersMicrocontroller\") {\n        document.getElementById(\"promicroOnlyYes\").disabled = true;\n        document.getElementById(\"promicroOnlyNo\").disabled = true;\n      } else {\n        document.getElementById(\"promicroOnlyYes\").disabled = false;\n        document.getElementById(\"promicroOnlyNo\").disabled = false;\n      }\n    }\n\n    if (e.target.name === \"keyboardForm\") {\n      if (e.target.id == \"notSplit\") {\n        document.getElementById(\"notActionOneHand\").disabled = true;\n      } else {\n        document.getElementById(\"notActionOneHand\").disabled = false;\n      }\n    } //------------------------------------------------------------------------------------------\n    // 補足情報の表示機能\n    //-----------------------------------------------------------------------------------------\n\n\n    if (e.target.name === \"wiring\") {\n      var parentFormGroupDiv = e.target.closest('.form-group');\n      var spanList = parentFormGroupDiv.getElementsByTagName('span');\n\n      var _iterator2 = _createForOfIteratorHelper(spanList),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var span = _step2.value;\n\n          if (span.dataset.wiringindex === e.target.dataset.wiringindex) {\n            span.classList.remove('invisible');\n          } else {\n            if (!span.classList.contains('invisible')) {\n              span.classList.add('invisible');\n            }\n          }\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  });\n})();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });