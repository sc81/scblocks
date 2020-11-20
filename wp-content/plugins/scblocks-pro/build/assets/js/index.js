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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@wordpress/dom-ready/build-module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/dom-ready/build-module/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return domReady; });
/**
 * @typedef {() => void} Callback
 *
 * TODO: Remove this typedef and inline `() => void` type.
 *
 * This typedef is used so that a descriptive type is provided in our
 * automatically generated documentation.
 *
 * An in-line type `() => void` would be preferable, but the generated
 * documentation is `null` in that case.
 *
 * @see https://github.com/WordPress/gutenberg/issues/18045
 */

/**
 * Specify a function to execute when the DOM is fully loaded.
 *
 * @param {Callback} callback A function to execute after the DOM is ready.
 *
 * @example
 * ```js
 * import domReady from '@wordpress/dom-ready';
 *
 * domReady( function() {
 * 	//do something after DOM loads.
 * } );
 * ```
 *
 * @return {void}
 */
function domReady(callback) {
  if (document.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.
  document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.
  ) {
      return void callback();
    } // DOMContentLoaded has not fired yet, delay callback until then.


  document.addEventListener('DOMContentLoaded', callback);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/assets/index.js":
/*!*****************************!*\
  !*** ./src/assets/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/assets/modal.js");
/* harmony import */ var _page_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-nav */ "./src/assets/page-nav.js");



/***/ }),

/***/ "./src/assets/modal.js":
/*!*****************************!*\
  !*** ./src/assets/modal.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@wordpress/dom-ready */ "./node_modules/@wordpress/dom-ready/build-module/index.js");


function createGoogleForm(contentDonor) {
  var src = contentDonor.querySelector('noscript').textContent;
  src = src + '&hl=en';
  var form = document.createElement('iframe');
  form.setAttribute('src', src);
  form.setAttribute('frameborder', '0');
  form.setAttribute('marginheight', '0');
  form.setAttribute('marginwidth', '0');
  form.textContent = 'Loading...';
  return form;
}

function destroyModal(modal) {
  if (document.body.contains(modal)) {
    document.body.removeChild(modal);
    document.body.style.overflowY = '';
  }
}

function createModal(contentDonor) {
  // modal
  var modal = document.createElement('div');
  modal.setAttribute('class', 'scb-modal'); // overlay

  var overlay = document.createElement('div');
  overlay.setAttribute('class', 'scb-modal-overlay');
  overlay.addEventListener('click', function () {
    destroyModal(modal);
  }); // add overlay

  modal.appendChild(overlay); // container

  var container = document.createElement('div');
  container.setAttribute('class', 'scb-modal-container'); // add container

  overlay.appendChild(container); // content

  var content = document.createElement('div');
  content.setAttribute('class', 'scb-modal-content');
  content.style.transform = 'scale(0.8)'; // add content

  container.appendChild(content); // button

  var button = document.createElement('button');
  button.setAttribute('class', 'scb-modal-close');
  button.setAttribute('aria-label', 'Close Modal');
  button.setAttribute('type', 'button'); // button icon

  button.innerHTML = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M12.12 10l3.53 3.53-2.12 2.12L10 12.12l-3.54 3.54-2.12-2.12L7.88 10 4.34 6.46l2.12-2.12L10 7.88l3.54-3.53 2.12 2.12z"></path></svg>'; // remove modal

  button.addEventListener('click', function () {
    destroyModal(modal);
  }); // add button

  container.appendChild(button); // iframe wrapper

  var iframeWrapper = document.createElement('div');
  iframeWrapper.setAttribute('class', 'scb-modal-wrap-iframe'); // add iframe wrapper

  content.appendChild(iframeWrapper); // content type

  var contentType = contentDonor.getAttribute('data-type');

  if (contentType === 'embed-video') {
    // video
    var video = contentDonor.querySelector('noscript').textContent;
    iframeWrapper.innerHTML = video;
    document.body.style.overflowY = 'hidden'; // google form
  } else {
    iframeWrapper.appendChild(createGoogleForm(contentDonor));
    iframeWrapper.style.paddingTop = '100%';
    document.body.style.overflowY = 'hidden';
  } // add modal


  document.body.appendChild(modal);
  modal.style.opacity = '1';
  setTimeout(function () {
    content.style.transform = '';
  }, 50);
}

function handleModal(contentDonor) {
  var contentDonorId = contentDonor.getAttribute('id'); // find trigger elements

  var modalTriggers = document.querySelectorAll(".scb-show-in-modal__".concat(contentDonorId));
  modalTriggers.forEach(function (trigger) {
    // if the trigger is not a link, find it
    if (trigger.tagName !== 'A') {
      trigger = trigger.querySelector('a');
    } // check again


    if (trigger.tagName !== 'A') {
      return;
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      createModal(contentDonor);
    });
  });
}

Object(_node_modules_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__["default"])(function () {
  document.querySelectorAll('.scb-show-in-modal').forEach(function (element) {
    handleModal(element);
  });
});

/***/ }),

/***/ "./src/assets/page-nav.js":
/*!********************************!*\
  !*** ./src/assets/page-nav.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@wordpress/dom-ready */ "./node_modules/@wordpress/dom-ready/build-module/index.js");

Object(_node_modules_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__["default"])(function () {
  var nav = document.querySelector('.scb-page-nav');
  var offset = nav.getAttribute('data-scb-offset') || 0;
  offset = parseInt(offset, 10);
  var links = nav.querySelectorAll('.scb-page-nav-link');
  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var href = event.currentTarget.getAttribute('href');

      if (!href) {
        return;
      }

      var sectionId = href.replace('#', '');
      var section = document.getElementById(sectionId);
      var originalTop = Math.floor(section.getBoundingClientRect().top) - offset;
      window.scrollBy({
        top: originalTop,
        left: 0,
        behavior: 'smooth'
      });
      window.history.pushState('', '', href);
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map