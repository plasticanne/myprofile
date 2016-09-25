export var supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
export var ie6 = false /*@cc_on || @_jscript_version < 5.7 @*/
export var ie7 = (document.all && !window.opera && window.XMLHttpRequest && navigator.userAgent.toString().toLowerCase().indexOf('trident/4.0') == -1) ? true : false;
export var ie8 = (navigator.userAgent.toString().toLowerCase().indexOf('trident/4.0') != -1);
export var ie9 = navigator.userAgent.toString().toLowerCase().indexOf("trident/5") > -1;
export var ie10 = navigator.userAgent.toString().toLowerCase().indexOf("trident/6") > -1;
export var ie11 = navigator.userAgent.toString().toLowerCase().indexOf("trident/7") > -1;
export var iexplorer = navigator.userAgent.indexOf('MSIE') > -1;
export var chrome = (navigator.userAgent.indexOf('Chrome') > -1) && (navigator.userAgent.indexOf("op") == -1) ? true : false;
export var firefox = navigator.userAgent.indexOf('Firefox') > -1;
export var safari = (navigator.userAgent.indexOf("Safari") > -1) && (navigator.userAgent.indexOf('Chrome') == -1) ? true : false;
export var camino = navigator.userAgent.indexOf("Camino") > -1;
export var opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
export var mobile_safari = ((navigator.userAgent.toString().toLowerCase().indexOf("iphone") != -1) || (navigator.userAgent.toString().toLowerCase().indexOf("ipod") != -1) || (navigator.userAgent.toString().toLowerCase().indexOf("ipad") != -1)) ? true : false;
export var android = navigator.userAgent.indexOf("Android") > -1;
