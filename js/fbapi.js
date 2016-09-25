// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        return true
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        return false
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        return null
    }
};

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    var safawg
    FB.getLoginStatus(function(response) {
        safawg = statusChangeCallback(response);
    });
    return safawg
};



// Load the SDK asynchronously

document.ondragstart = function() {
    return false;
};
window.fbAsyncInit = function() {
    FB.init({
        appId: '883006181804225',
        cookie: true,
        xfbml: true,
        version: 'v2.7'
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.7&appId=883006181804225";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// GA
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-83665709-1', 'auto');
ga('send', 'pageview');

export var clickfbbutton=function (id, fields, res) {
    $('#fbapi_div2').on("click", id, function() {
        FB.api('/me', fields, function(response) {
            if (checkLoginState()) {
                ga('set', 'dimension1', response.gender);
                ga('set', 'dimension2', new Date(response.birthday).getFullYear());
                ga('send', 'pageview');
                if (res == 'gender') {
                    $(id).parent('p').next('h1').text(response.gender);
                    ga('set', 'dimension3', response.gender);
                    ga('send', 'event', {
                        'eventCategory': 'FB login',
                        'eventAction': 'user info',
                        'eventLabel': 'check gender',
                        'eventValue': 1,
                    });
                } else {
                    $(id).parent('p').next('h1').text(new Date(response.birthday).getFullYear());
                    ga('set', 'dimension4', new Date(response.birthday).getFullYear());
                    ga('send', 'event', {
                        'eventCategory': 'FB login',
                        'eventAction': 'user info',
                        'eventLabel': 'check birth year',
                        'eventValue': 1,
                    });
                };
            } else {
                $(id).parent('p').next('h1').text('please logo in your FB and alppy this app')
            };
        });
    });
};


export var getFb;
(getFb = function() {
    var fbButton = '<p><button id="FBgen" class="btn btn-default">Get your FB gender</button></p><h1></h1><p><button id="FBbir" class="btn btn-default">Get your FB birth year</button></p><h1></h1>'
    $('#fbapi_div2').html(fbButton);
});



/*
FB.api('/me', fields: "name,friends", function(response) {
    ga('set', {
        'dimension2': response.summary.total_count,
        'dimension1': response.name,
    });
    ga('send', 'event', {
        'eventCategory': 'FB login',
        'eventAction': 'user info'
        'eventValue': 1,
    });
});



var GA_LOCAL_STORAGE_KEY = 'ga:clientId';

if (window.localStorage) {
    ga('create', 'UA-XXXXX-Y', 'auto', {
        'storage': 'none',
        'clientId': localStorage.getItem(GA_LOCAL_STORAGE_KEY)
    });
    ga(function(tracker) {
        localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'));
    });
} else {
    ga('create', 'UA-XXXXX-Y', 'auto');
}

FB.api('/me', fields: "name,friends", function(response) {
    ga('set', {
        'dimension2': response.summary.total_count,
        'dimension1': response.name,
    });
});

ga('send', 'pageview');
*/
