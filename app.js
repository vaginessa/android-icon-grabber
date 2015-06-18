var SEARCH_URL = "https://play.google.com/store/search?q=";
var APP_URL = "https://play.google.com/store/apps/details?id=";

var button = document.getElementById("search_button");
var spinner = document.getElementById("spinner");
var input = document.getElementById("search_term");
var autoDownloadCheckbox = document.getElementById("autodownload_check")

var template = document.querySelector('template[is=auto-binding]');

//enter key = clicking search
template.checkKey = function(e) {
  if(e.keyCode === 13 || e.charCode === 13) {
    button.click();
  }
};


function getSearchTerm() {
  spinner.active = true;
  //Make the search term url safe
  var searchTerm = encodeURIComponent(input.value);
  var autoDownload = autoDownloadCheckbox.checked;
  var importIoUrl = "https://api.import.io/store/data/1cc56097-4838-4532-a028-04a03489b39b/_query?input/webpage/url=https%3A%2F%2Fplay.google.com%2Fstore%2Fsearch%3Fq%3D " + searchTerm + "%26c%3Dapps%26docType%3D1%26sp%3DCAFiCQoHcG9rZW1vbnoCGACKAQIIAQ%253D%253D%3AS%3AANO1ljLNqDU&_user=7fd7c058-d727-4b19-afa1-d439fd151fcd&_apikey=7fd7c058-d727-4b19-afa1-d439fd151fcd%3AKLy%2Bi6C4pImCFhj8O1Kodntp5sRDVpFqpSFnVXnkroh%2FtUuIi%2Fuhe4km9ggNfgu08gVyRj5xQLSZWzaSKJCt8w%3D%3D"
  
  $.ajax({
    url: importIoUrl,
    type: "GET",
    success: function (response) {
      if (response == null || response.results == null || response.results.length == 0) {
        $("#demo_img").attr('src', "/images/nope.png");
      } else {
        var coverImageFull = response.results[0].cover_image.substring(0, response.results[0].cover_image.length - 5);
        $("#demo_img").attr('src', coverImageFull);
        $("#image_link").attr('href', coverImageFull);
        if (autoDownload) {
          $("#demo_img").click();
        }
      }
      spinner.active = false;
    },
    error: function () {
      console.log("Error");
      $("#demo_img").attr('src', "/images/nope.png");
      spinner.active = false;
    }
  });

}
