//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Define the 'request' function to handle interactions with the server
window.request = function(url, data, callback, verb) {
  return fetch(url, {
    credentials: 'same-origin',
    method: verb, // GET, PUT, POST, DELETE...
    body: data ? JSON.stringify(data) : null,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text-plain, */*',
      'X-Requested-With': 'XMLHttpRequest'
    })
  })
  .then(response => response.json())
  .then(function(response) {
    if(callback)
      callback(response);
  })
  .catch(error => console.error('Error:', error));
}

//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// Make a request to the server
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
// Handle the server response
function server_response(data) {
  const div = document.getElementById('response');
  div.textContent = data.payload;
}
