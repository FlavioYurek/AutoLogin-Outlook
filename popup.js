document.addEventListener('DOMContentLoaded', function() {
  let button = document.getElementById('signin');

  button.addEventListener('click', function() {
      console.log('Botón "Iniciar Sesión" clickeado');

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { message: "login" }, function(response) {
              if (chrome.runtime.lastError) {
                  console.error('Error en el envío del mensaje:', chrome.runtime.lastError.message);
              } else {
                  console.log('Respuesta:', response);
              }
          });
      });
  });
});
