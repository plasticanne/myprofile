// Initialize Firebase
var fireconfig = {
    apiKey: "AIzaSyCVuTk26Wbu2TvR4fMhMBFbO1lnZsQnrbU",
    authDomain: "myprofiletest1-1677a.firebaseapp.com",
    databaseURL: "https://myprofiletest1-1677a.firebaseio.com",
    storageBucket: "myprofiletest1-1677a.appspot.com",
};
firebase.initializeApp(fireconfig);

// Get a reference to the database service
var myDataRef = firebase.database();

function chatkey(e) {

    if (e.keyCode == 13) {
        var name
        $('#nameInput').val() ? (name = $('#nameInput').val()) : (name = 'Anonymous');
        var text = $('#messageInput').val();
        if (!(text.match(/[貓]/g)) && !(name.match(/[貓]/g))) {

            var newPostKey = firebase.database().ref('posts').push().key;
            var updates = {};
            updates['/posts/' + newPostKey + '/name'] = name;
            updates['/posts/' + newPostKey + '/text'] = text;
            updates['/posts/' + newPostKey + '/date'] = Date();
            myDataRef.ref().update(updates);
            $('#messageInput').val('');
        } else {
            displayChatMessage('貓 is a forbidden word');

        };
    };
};

function displayChatMessage(name, text, date) {
    $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).prepend($('<em/>').text(date + '- ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};


myDataRef.ref('posts').limitToLast(20).on('child_added', function(snapshot) {

    var message = snapshot.val();
    displayChatMessage(message.name, message.text, new Date(message.date).toLocaleTimeString());
});
