// ==UserScript==
// @name        Springshare LibInsight Dataset Downloader
// @namespace   https://github.com/gsu-library/
// @author      mbrooks34@gsu.edu
// @license     GPLv3
// @version     1.0.1
// @description Adds a download all reports item to the admin menu when on a dataset page in LibInsight Lite.
// @match       https://gsu.libinsight.com/dataseta.php
// @grant       none
// @downloadURL https://github.com/gsu-library/userscripts/raw/master/springshare-libinsight-dataset-downloader.js
// @updateURL   https://github.com/gsu-library/userscripts/raw/master/springshare-libinsight-dataset-downloader.js
// @homepageURL https://github.com/gsu-library/userscripts
// @supportURL  https://github.com/gsu-library/userscripts/issues
// ==/UserScript==

(function(){
   'use strict';

   // Set this array to the dataset IDs you want to download.
   const datasetIds = [
      4698,
      4878,
      5011,
      23318,
      22125,
      22124,
      22126,
      22123,
      22122
   ];
   let token;


   // Only if we find a CSRF token.
   if(token = document.querySelector('input[name="csrf_token"]')) {
      let li = document.createElement('li');
      li.innerHTML = '<a href="#" onclick="getAllReports()">Download All Reports</a>';
      let adminMenu = document.querySelector('#s-lg-admin-command-bar ul').children[6].children[1];
      adminMenu.appendChild(li);


      // Onclick event
      li.firstChild.onclick = e => {
         e.preventDefault();
         e.stopPropagation();
         let url = "https://gsu.libinsight.com/dataseta.php?action=download&filter_sort=date-desc&uid=&from=1900-01-01&to=2200-12-31&filter=day_limit=21&hr_start=0&hr_end=24&uid=0&duration_op=&duration_min=0";
         url += "&csrf_token=" + token.value;

         datasetIds.forEach(id => {
            setTimeout(() => {
               let a = document.createElement('a');
               a.href = url + '&id=' + id;
               document.body.appendChild(a);
               a.setAttribute('target', '_blank');
               a.click();
               a.remove();
            }, 100);
         });
      }
   }
})();
