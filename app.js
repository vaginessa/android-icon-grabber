var SEARCH_URL = "https://play.google.com/store/search?q=";
var APP_URL = "https://play.google.com/store/apps/details?id=";

var button = document.getElementById("search_button");
var spinner = document.getElementById("spinner");
var input = document.getElementById("search_term");
var autoDownloadCheckbox = document.getElementById("autodownload_check")

var template = document.querySelector('template[is=auto-binding]');

template.checkKey = function(e) {
  if(e.keyCode === 13 || e.charCode === 13) {
    button.click();
  }
};


function getSearchTerm() {

  console.log("getSearchTerm");
  spinner.active = true;
  var searchTerm = input.value;
  var autoDownload = autoDownloadCheckbox.checked;
    //Get the value of the input


  console.log("calling php");
  $.ajax({
    url:'search_for_app.php',
    data: { query: searchTerm},
    type: "GET",
    complete: function (response) {
      console.log(response.responseText);
      if (response == null || response.responseText == "error") {
        console.log("server returned error");
        $("#demo_img").attr('src', "/images/ic_alert_warning");
      } else { 
        $("#demo_img").attr('src', response.responseText);
        $("#image_link").attr('href', response.responseText);
      }
      spinner.active = false;
      if (autoDownload) {
        $("#demo_img").click();
      }
    },
    error: function () {
      alert("Could not download icon.");
      console.log("Error");
      spinner.active = false;
    }
  });

}
