//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Define the 'request' function to handle interactions with the server
window.request = function(url, data={}, callback, verb) {
  return fetch(url, {
    credentials: 'same-origin',
    method: verb,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  .then(response => response.json())
  .then(function(response) {
    if(callback)
      callback(response);
  })
  .catch(error => console.error('Error:', error));
}

//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Make a request to the server by tying an event listener to the form
const form = document.getElementById('request_form');
form.addEventListener('submit', (event) => {
  // Stop the default form behavior
  event.preventDefault();

  // Grab the needed form fields
  const action = form.getAttribute('action');
  const method = form.getAttribute('method');
  const data = Object.fromEntries(new FormData(form).entries());

  // Make a request to the server
  window.request(action, data, server_response, method);
});

//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Handle the server response with this callback funnction
function server_response(data) {
  const div = document.getElementById('response');
  div.textContent = data.payload;
}
