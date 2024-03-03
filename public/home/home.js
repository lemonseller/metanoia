document.getElementById('loginButton').addEventListener('click', function() {
    // Generate a random email
    const randomEmail = 'user' + Math.floor(Math.random() * 1000) + '@example.com';
  
    // Store the email in localStorage
    localStorage.setItem('email', randomEmail);
  
    // Redirect to the logged-in page
    window.location.href = '/loggedin.html';
  });