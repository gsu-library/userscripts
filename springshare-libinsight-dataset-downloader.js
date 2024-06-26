// ==UserScript==
// @name        Springshare LibInsight Dataset Downloader
// @namespace   https://github.com/gsu-library/
// @author      mbrooks34@gsu.edu
// @license     GPLv3
// @version     2.0.0
// @description Adds a download all reports item to the admin menu on the datasets page in LibInsight Lite.
// @match       https://gsu.libinsight.com/admin/all
// @grant       none
// @downloadURL https://github.com/gsu-library/userscripts/raw/master/springshare-libinsight-dataset-downloader.js
// @updateURL   https://github.com/gsu-library/userscripts/raw/master/springshare-libinsight-dataset-downloader.js
// @homepageURL https://github.com/gsu-library/userscripts
// @supportURL  https://github.com/gsu-library/userscripts/issues
// ==/UserScript==

(() => {
   'use strict';

   // Set this array to strings of the dataset IDs you do not want to download.
   const blacklist = [
      '4698',
      '4878',
      // '5011',
      '7927'
   ];
   let datasetsRows;
   let datasetCounts = [];

   // Process dataset ids and counts. Add menu item to download reports.
   if(datasetsRows = document.querySelectorAll('#all-datasets tr')) {
      let dataRows = [].slice.call(datasetsRows, 2);

      dataRows.forEach(row => {
         datasetCounts.push({
            id: row.childNodes[1].textContent,
            count: row.childNodes[7].textContent.replace(',', '')
         });
      });

      datasetCounts = datasetCounts.filter(dataset => !blacklist.includes(dataset.id));


      // Create menu item.
      let downloadLink = document.createElement('a');
      downloadLink.setAttribute('class', 'dropdown-item');
      downloadLink.setAttribute('href', '#');
      downloadLink.text = 'Download All Reports';
      let adminMenu = document.querySelector('#li-admin-navbar-manage').parentNode.querySelector('div');
      adminMenu.appendChild(downloadLink);
      let startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
      let startDateFormatted = startDate.toLocaleDateString('en-us', { month: 'short' });
      startDateFormatted += ' ' + startDate.toLocaleDateString('en-us', { day: '2-digit' });
      startDateFormatted += ' ' + startDate.toLocaleDateString('en-us', { year: 'numeric' });


      // Download reports.
      downloadLink.onclick = e => {
         e.preventDefault();
         e.stopPropagation();

         datasetCounts.forEach(dataset => {
            let url = 'https://gsu.libinsight.com/admin/custom-dataset/' + dataset.id + '/export' +
               '?filters[page]=1' +
               '&iid=294' +
               '&dataset_id=' + dataset.id +
               '&dataset_type=1' +
               '&user_level=1' +
               '&total_count=' + dataset.count +
               '&from=' + startDateFormatted +
               '&to=Dec 31 9999' +
               '&filters[day_limit]=21' +
               '&filters[hr_start]=0' +
               '&filters[hr_end]=24' +
               '&filters[sort]=date-desc';

            setTimeout(() => {
               let a = document.createElement('a');
               a.href = url;
               document.body.appendChild(a);
               a.setAttribute('target', '_blank');
               a.click();
               a.remove();
            }, 100);
         });
      }
   }
})();
