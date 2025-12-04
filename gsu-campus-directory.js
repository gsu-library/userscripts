// ==UserScript==
// @name        GSU Campus Directory Name Focus
// @namespace   https://github.com/gsu-library/
// @author      mbrooks34@gsu.edu
// @license     GPLv3
// @version     1.1.0
// @description Focus first name input on campus directory page.
// @match       https://campusdirectory.gsu.edu/*
// @grant       none
// @downloadURL https://github.com/gsu-library/userscripts/raw/master/gsu-campus-directory.js
// @updateURL   https://github.com/gsu-library/userscripts/raw/master/gsu-campus-directory.js
// @homepageURL https://github.com/gsu-library/userscripts
// @supportURL  https://github.com/gsu-library/userscripts/issues
// ==/UserScript==

(() => {
   'use strict';

   let inputs = document.querySelectorAll('input[type="text"]');

   // Focus the last visible/displayed input box.
   inputs.foreach(input => {
      input.focus();
   });
})();
