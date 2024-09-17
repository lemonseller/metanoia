import { gapi } from 'gapi'; // Add the missing import statement for the gapi object

window.onload = function() {
  fetch('/questions')
    .then(response => response.json())
    .then(questions => {
      const questionsContainer = document.getElementById('questions');
      questions.forEach(question => {
        const p = document.createElement('p');
        p.textContent = question.question;
        questionsContainer.appendChild(p);
      });
    })
    .catch(error => console.error('Error:', error));
};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  // Store the email in localStorage
  localStorage.setItem('email', profile.getEmail());

  // Redirect to loggedin.html
  window.location.href = 'loggedin.html';
}
  
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });


}
gapi.load('auth2', function() {
  gapi.auth2.init({
    client_id: '293351650047-pe3eoqf5m1qfslm0v0ddau2n0hopsaim.apps.googleusercontent.com'
    // Add other configuration options as needed.
  });
});
  document.getElementById('googleSignIn').onclick = function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    });
  };