/* global $, jQuery, window, document */

;(function(){
    'use strict';

    if (window.location.protocol != "https:"){
        //window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
    }

    window.WebFontConfig = {
        google: {
            families: [
                'PT+Sans:400,700'
                , 'PT+Sans+Narrow:400,700'
            ]
        },
        timeout: 2000
    };

    (function() {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

})();