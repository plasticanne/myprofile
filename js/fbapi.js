

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

function clickfbbutton(id, fields, res, rebtn) {
    $('#fbapi_div2').on("click", id, function() {
        FB.api('/me', fields, function(response) {
            if (checkLoginState()) {
                $(rebtn).html(eval("response." + res))
            } else {
                $(rebtn).html('please logo in your FB and alppy this app')
            };
        });
    });
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

var getFb;
(getFb = function() {
    var fbButton = '<p><button id="fbname" class="btn btn-default">Get your FB name</button></p><h1 id="fbnamere"></h1><p><button id="friendc" class="btn btn-default">Get your FB friends count</button></p><h1 id="fbfriendsre"></h1>'
    $('#fbapi_div2').html(fbButton);
});
