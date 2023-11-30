console.log("Content script");

function login() {
    console.log('Función login() llamada');

    const email = "INGRESE SU CORREO";
    const signInButton = document.getElementById('idSIButton9');
    const displayNameElement = document.getElementById('displayName');

    function fillPassword() {
        const passwordInput = document.getElementById('i0118');
        if (passwordInput) {
            console.log('Función fillPassword() llamada');
            passwordInput.value = "INGRESE SU CONTRASEÑA";
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
        } else {
            console.log("Campo de contraseña no encontrado");
        }
    }

    // Verificar si ya se hizo clic en el correo y estamos en la pantalla de ingresar contraseña
    if (displayNameElement && signInButton) {
        fillPassword();
    } else {
        // Estamos en la pantalla de usuario, llena el campo y hace clic en el botón "Siguiente"
        const usernameInput = document.getElementById('i0116');
        if (usernameInput && signInButton) {
            usernameInput.value = email;
            usernameInput.dispatchEvent(new Event('change'));
            signInButton.click();
            console.log("Haciendo clic en Siguiente");

            // Esperar a que la pantalla de contraseña esté disponible antes de continuar
            const intervalId = setInterval(() => {
                const passwordInput = document.getElementById('i0118');
                if (passwordInput) {
                    clearInterval(intervalId);
                    fillPassword();
                }
            }, 500);
        } else {
            console.log("Elementos no encontrados");
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
