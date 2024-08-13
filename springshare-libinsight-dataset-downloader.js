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
   "use strict";

   // Set this array to strings of the dataset IDs you do not want to download.
   const blacklist = [
       // '4698',
       // '4878',
       // '5011',
       '7927',
       "22125",
       "22124",
       "22126",
       "22123",
       "22122",
   ];
   const maxRecords = 10000;
   let datasetsRows;
   let datasetCounts = [];

   // Process dataset ids and counts. Add menu item to download reports.
   if ((datasetsRows = document.querySelectorAll("#all-datasets tr"))) {
       let dataRows = [].slice.call(datasetsRows, 2);

       dataRows.forEach((row) => {
           datasetCounts.push({
               id: row.childNodes[1].textContent,
               count: row.childNodes[7].textContent.replace(",", ""),
           });
       });

       datasetCounts = datasetCounts.filter(
           (dataset) => !blacklist.includes(dataset.id)
       );

       // Create menu item.
       let downloadLink = document.createElement("a");
       downloadLink.setAttribute("class", "dropdown-item");
       downloadLink.setAttribute("href", "#");
       downloadLink.text = "Download All Reports";
       let adminMenu = document
           .querySelector("#li-admin-navbar-manage")
           .parentNode.querySelector("div");
       adminMenu.appendChild(downloadLink);

       // Download reports.
       downloadLink.onclick = (e) => {
           e.preventDefault();
           e.stopPropagation();

           datasetCounts.forEach((dataset) => {
               // Download report if number of records less than max records
               if (dataset.count < maxRecords) {
                   downloadReport(dataset);
               }
               else // Queue report if number of records more than max records
               {
                   queueReport(dataset);
               }
           });
       };
   }

   function downloadReport(dataset)
   {
       let url = 'https://gsu.libinsight.com/admin/custom-dataset/' + dataset.id + '/export' +
          '?filters[page]=1' +
          '&iid=294' +
          '&dataset_id=' + dataset.id +
          '&dataset_type=1' +
          '&user_level=1' +
          '&total_count=' + dataset.count +
          '&from=Jan 01 0000' +
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
   }

   function queueReport(dataset)
   {
       let url = "https://gsu.libinsight.com/admin/reports/" + dataset.id + "/add";
       let form = new FormData();
       form.set("name", "Dataset-" + dataset.id + "-" + new Date().toISOString());
       form.set("dataset_type", 1);
       form.set("record_count", dataset.count);
       form.set("date_range", "Custom Date Range");

       let options = '?filters[page]=1' +
           '&iid=294' +
           '&dataset_id=' + dataset.id +
           '&dataset_type=1' +
           '&user_level=1' +
           '&total_count=' + dataset.count +
           '&from=Jan 01 0000' +
           '&to=Dec 31 9999' +
           '&filters[day_limit]=21' +
           '&filters[hr_start]=0' +
           '&filters[hr_end]=24' +
           '&filters[sort]=date-desc';
       form.set("options", options);

       fetch(url, {
           method: "POST",
           body: form,
       });
   }
})();