// Login
// Variables
const formLogin = document.getElementById('form_login');
const emailLogin = document.getElementById('email_modal_login');
const passwordLogin = document.getElementById('password_login');
const btnEntrar = document.getElementById('entrar');
const botonEntrar = document.getElementById('boton-entrar');

// expresion regular para la validación del email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let usuarioRegistrado = [];

// Event listeners
document.addEventListener("DOMContentLoaded", iniciar);

// Logear cliente
formLogin.addEventListener('submit', loginCliente);

// Inicia el formulario
function iniciar() {
	btnEntrar.disabled = true;
	btnEntrar.classList.add('cursor-not-allowed', 'opacity-50');

	emailLogin.classList.remove('border-2-green');
	passwordLogin.classList.remove('border-2-green');

    // campos del formulario
    emailLogin.addEventListener('blur', validarFormulario);

}

// Mostrar errores
function mostrarError(mensaje, referencia) {
	limpiarError(referencia);

	//Genera el mensaje de error en HTML
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add('error');

	referencia.appendChild(mensajeError);
}

// Limpiar los mensajes de error
function limpiarError(referencia) {
	//comprueba si ya existe un mensaje de error
	const error = referencia.querySelector('p.error');
	if (error) {
		error.remove();
	}
}

// Validar email
function validarEmail(e) {

	if (e.target.type === 'email') {

		if (er.test(e.target.value)) {
			// email válido
			limpiarError(e.target.parentElement);

			e.target.classList.remove('border-2-red');
			e.target.classList.add('border-2-green');
			return e.target.value;
		} else {
			e.target.classList.remove('border-2-green');
			e.target.classList.add('border-2-red');

			mostrarError('Email no válido', e.target.parentElement);
			return;
		}
	}
}

//Validar Formulario
function validarFormulario(e) {

    // validar obligatoriedad de todos los campos
    if (e.target.value.trim().length > 0) {
		// si hay algo escrito en los campos
		// Eliminamos los errores si los hay
		limpiarError(e.target.parentElement);

		e.target.classList.remove('border-2-red');
		e.target.classList.add('border-2-green');

	} else {
		e.target.classList.remove('border-2-green');
		e.target.classList.add('border-2-red');

		mostrarError('Todos los campos son obligatorios', e.target.parentElement);
		return;
	}

    validarEmail(e);

    if (er.test(emailLogin.value)) {
		btnEntrar.disabled = false;
		btnEntrar.classList.remove('cursor-not-allowed', 'opacity-50');
		btnEntrar.classList.add('cursor-pointer');
	}
}

// Entrada de cliente
function loginCliente(e) {
	e.preventDefault();
	//
	let usuarioLogeado;
	const usuarioLogeadoExist = usuarios.find((usuario) => usuario.email === emailLogin.value.toLowerCase());

	let usuarioStorageExist;
	if (JSON.parse(localStorage.getItem('usuario'))) {
		usuarioStorageExist = JSON.parse(localStorage.getItem('usuario')).find((usuario) => usuario.email === emailLogin.value.toLowerCase());
	}

    if (usuarioLogeadoExist) {

		usuarioLogeado = usuarios.filter((usuario) => usuario.email === emailLogin.value.toLowerCase());
	} else if (usuarioStorageExist){
		usuarioLogeado = JSON.parse(localStorage.getItem('usuario'));
	} else {
		const parrafo = document.createElement('p');
		parrafo.textContent = 'Email o password erroneos';
		parrafo.classList.add('error');

		botonEntrar.appendChild(parrafo);

		setTimeout(() => {
			parrafo.remove();
			formLogin.reset();

			iniciar();

		}, 2000);

		return;
	}
	const email = usuarioLogeado[0].email.toLowerCase();
	const password = usuarioLogeado[0].password;

	if (email === emailLogin.value.toLowerCase() && password === passwordLogin.value) {
		const parrafo = document.createElement('p');
		parrafo.textContent = 'Nos alegra volverte a ver...';
		parrafo.classList.add('logeado-ok');

		botonEntrar.appendChild(parrafo);

		setTimeout(() => {
			parrafo.remove();
			formLogin.reset();

			iniciar();
			localStorage.setItem('usuario', JSON.stringify(usuarioLogeado));

			location.href = "index.html";

		}, 2000);
	} else {
		const parrafo = document.createElement('p');
		parrafo.textContent = 'Email o password erroneos';
		parrafo.classList.add('error');

		botonEntrar.appendChild(parrafo);

		setTimeout(() => {
			parrafo.remove();
			formLogin.reset();

			iniciar();

		}, 2000);
	}
}	

