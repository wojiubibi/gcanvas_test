/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(265)
	__webpack_require__(249)
	var __weex_template__ = __webpack_require__(268)
	var __weex_style__ = __webpack_require__(269)
	var __weex_script__ = __webpack_require__(270)

	__weex_define__('@weex-component/5efec0a39c4d8f94c5e8f7170c422834', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/5efec0a39c4d8f94c5e8f7170c422834',undefined,undefined)

/***/ },

/***/ 244:
/***/ function(module, exports) {

	module.exports = {
	  "type": "image",
	  "style": {
	    "width": function () {return this.width},
	    "height": function () {return this.height}
	  },
	  "attr": {
	    "src": function () {return this.src},
	    "imageQuality": function () {return this.quality}
	  },
	  "events": {
	    "click": "_clickHandler"
	  }
	}

/***/ },

/***/ 245:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	module.exports = {
	  data: function () {return {
	    quality: 'normal',
	    width: 0,
	    height: 0,
	    src: '',
	    href: '',
	    spmc: 0,
	    spmd: 0
	  }},
	  methods: {
	    ready: function ready() {},
	    _clickHandler: function _clickHandler() {
	      this.$call('modal', 'toast', {
	        message: 'click',
	        duration: 1
	      });
	    }
	  }
	};}
	/* generated by weex-loader */


/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(244)
	var __weex_script__ = __webpack_require__(245)

	__weex_define__('@weex-component/banner', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	})


/***/ },

/***/ 247:
/***/ function(module, exports) {

	module.exports = {
	  "type": "container",
	  "children": [
	    {
	      "type": "container",
	      "shown": function () {return this.direction==='row'},
	      "style": {
	        "flexDirection": "row"
	      },
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.ds},
	          "style": {
	            "width": function () {return this.width},
	            "height": function () {return this.height},
	            "marginLeft": function () {return this.space}
	          },
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.width},
	                "height": function () {return this.height},
	                "src": function () {return this.img},
	                "href": function () {return this.url}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "container",
	      "shown": function () {return this.direction==='column'},
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.ds},
	          "style": {
	            "width": function () {return this.width},
	            "height": function () {return this.height},
	            "marginTop": function () {return this.space}
	          },
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.width},
	                "height": function () {return this.height},
	                "src": function () {return this.img},
	                "href": function () {return this.url}
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },

/***/ 248:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	module.exports = {
	  data: function () {return {
	    space: 0,
	    width: 0,
	    height: 0,
	    spmc: 0,
	    spmdprefix: '',
	    ds: []
	  }},
	  methods: {
	    ready: function ready() {
	      var self = this;
	      var ds = self.ds;
	      var length = ds.length;
	      for (var i = 0; i < length; i++) {
	        var item = ds[i];
	        item.index = i;
	        item.space = i % length === 0 ? 0 : self.space;
	      }
	    }
	  }
	};}
	/* generated by weex-loader */


/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(246)
	var __weex_template__ = __webpack_require__(247)
	var __weex_script__ = __webpack_require__(248)

	__weex_define__('@weex-component/banners', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	})


/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(266)
	var __weex_script__ = __webpack_require__(267)

	__weex_define__('@weex-component/link', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	})


/***/ },

/***/ 266:
/***/ function(module, exports) {

	module.exports = {
	  "type": "text",
	  "classList": [
	    "link"
	  ],
	  "shown": function () {return this.href},
	  "events": {
	    "click": "_clickHandler"
	  },
	  "attr": {
	    "value": function () {return this.text}
	  }
	}

/***/ },

/***/ 267:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	module.exports = {
	  data: function () {return {
	    text: '',
	    href: ''
	  }},
	  methods: {
	    _clickHandler: function _clickHandler() {
	      this.$call('modal', 'toast', {
	        message: 'click',
	        duration: 1
	      });
	    }
	  }
	};}
	/* generated by weex-loader */


/***/ },

/***/ 268:
/***/ function(module, exports) {

	module.exports = {
	  "type": "container",
	  "classList": [
	    "container"
	  ],
	  "children": [
	    {
	      "type": "image",
	      "classList": [
	        "banner"
	      ],
	      "attr": {
	        "src": function () {return this.ds.topBanner}
	      }
	    },
	    {
	      "type": "container",
	      "classList": [
	        "rule-container"
	      ],
	      "children": [
	        {
	          "type": "link",
	          "style": {
	            "fontSize": 22,
	            "color": "#ffffff",
	            "textAlign": "center"
	          },
	          "attr": {
	            "text": "??????",
	            "href": function () {return this.ds.ruleLink}
	          }
	        }
	      ]
	    },
	    {
	      "type": "container",
	      "classList": [
	        "announce"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "announce-hd"
	          ],
	          "attr": {
	            "src": function () {return this.ds.announceHdBanner}
	          }
	        },
	        {
	          "type": "banners",
	          "style": {
	            "marginLeft": 6,
	            "marginRight": 6
	          },
	          "attr": {
	            "ds": function () {return this.ds.bannerItems},
	            "direction": "row",
	            "width": function () {return this.NUMBER_233},
	            "height": function () {return this.NUMBER_172},
	            "space": function () {return this.NUMBER_3}
	          }
	        }
	      ]
	    }
	  ]
	}

/***/ },

/***/ 269:
/***/ function(module, exports) {

	module.exports = {
	  "banner": {
	    "width": 750,
	    "height": 782
	  },
	  "share-container": {
	    "position": "absolute",
	    "right": 100,
	    "top": 15,
	    "zIndex": 100,
	    "fontSize": 20,
	    "color": "#ffffff",
	    "backgroundColor": "#000000",
	    "borderRadius": 17,
	    "width": 110,
	    "height": 35,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "rule-container": {
	    "position": "absolute",
	    "right": 22,
	    "top": 15,
	    "zIndex": 100,
	    "fontSize": 20,
	    "color": "#ffffff",
	    "backgroundColor": "#000000",
	    "borderRadius": 17,
	    "width": 70,
	    "height": 35,
	    "justifyContent": "center"
	  },
	  "announce": {
	    "backgroundColor": "#f5f3f4",
	    "width": 716,
	    "height": 286,
	    "position": "absolute",
	    "bottom": 17,
	    "left": 17,
	    "borderRadius": 5
	  },
	  "announce-hd": {
	    "width": 700,
	    "height": 90,
	    "marginTop": 8,
	    "marginBottom": 8,
	    "marginLeft": 5,
	    "marginRight": 5
	  }
	}

/***/ },

/***/ 270:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){"use strict";

	module.exports = {
	  data: function () {return {
	    ds: {},
	    NUMBER_233: 233,
	    NUMBER_172: 172,
	    NUMBER_3: 3
	  }},
	  methods: {
	    ready: function ready() {
	      var self = this;
	      self.isH5 = self._app.IS_H5;
	      self.isTM = self._app.IS_TM;
	      self.isTest = self._app.IS_TEST;
	    }
	  }
	};}
	/* generated by weex-loader */


/***/ }

/******/ });