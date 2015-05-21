(function() {
    'use strict';

    /* Polymer UI and UX */

console.log("loading template");
    var template = document.querySelector('template[is=auto-binding]');

    template.checkKey = function(e) {
    	console.log("Enter pressed");
        if(e.keyCode === 13 || e.charCode === 13) {
            console.log("Enter pressed");
        }
    };

})();