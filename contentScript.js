console.log("Content script");

function login() {
    console.log('Función login() llamada');

    const email = "fmoreno@coorditanques.com";
    const usernameInput = document.getElementById('i0116');
    const signInButton = document.getElementById('idSIButton9');

    if (usernameInput && signInButton) {
        if (usernameInput.value === "") {
            // Estamos en la pantalla de usuario, llena el campo y hace clic en el botón "Siguiente"
            usernameInput.value = email;
            usernameInput.dispatchEvent(new Event('change'));
            signInButton.click();
            console.log("Haciendo clic en Siguiente");
        } else {
            // Estamos en la pantalla de contraseña, mueve la declaración de passwordInput aquí
            const passwordInput = document.getElementById('i0118');
            if (passwordInput && passwordInput.getAttribute('aria-required') === 'true' && passwordInput.value === "") {
                // Llena el campo de contraseña
                passwordInput.value = "Diople71.com";
                passwordInput.dispatchEvent(new Event('input'));

                // Intentar hacer clic en el botón de inicio de sesión después de un breve retraso
                setTimeout(() => {
                    const signInButtonAfterPassword = document.getElementById('idSIButton9');
                    if (signInButtonAfterPassword) {
                        signInButtonAfterPassword.click();
                        console.log("Inicio de sesión completado");
                    } else {
                        console.log("Botón Iniciar Sesión después de ingresar la contraseña no encontrado");
                    }
                }, 500);
            }
        }
    }
}

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.message === "login") {
        // Revisar si el correo está precargado
        const emailElement = document.querySelector('div[data-bind*="session.unsafe_fullName"]');

        if (emailElement) {
            // Si el correo está precargado, haz clic en él y espera un breve tiempo antes de llamar a la función de inicio de sesión
            emailElement.click();
            await new Promise(r => setTimeout(r, 500));
            login();
        } else {
            // Si el correo no está precargado, simplemente llama a la función de inicio de sesión
            login();
        }
    }
});
