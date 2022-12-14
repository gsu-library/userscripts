// ==UserScript==
// @name        SharePoint Permission Link
// @namespace   https://github.com/gsu-library/
// @author      mbrooks34@gsu.edu
// @license     GPLv3
// @version     1.0.0
// @description Adds a site permission link on the right ribbon for SharePoint site landing pages.
// @match       https://mygsu.sharepoint.com/sites/universitylibrary/*
// @downloadURL https://github.com/gsu-library/userscripts/raw/master/sharepoint-permission-link.js
// @updateURL   https://github.com/gsu-library/userscripts/raw/master/sharepoint-permission-link.js
// @homepageURL https://github.com/gsu-library/userscripts
// @supportURL  https://github.com/gsu-library/userscripts/issues
// ==/UserScript==


(() => {
   'use strict';

   let href = window.location.href;

   if(/SitePages/.test(href)) {
      href = href.replace(/SitePages.*$/, '_layouts/15/user.aspx');
      let ribbon;

      if(ribbon = document.querySelector('#RibbonContainer-TabRowRight')) {
         let a = document.createElement('a');
         a.href = href;
         a.style.color = 'rgb(51, 51, 51)';
         a.style.display = 'inline-block';
         a.style.margin = '0 10px 0 0';
         a.text = 'Site Permissions';
         ribbon.prepend(a);
      }
   }
})();
