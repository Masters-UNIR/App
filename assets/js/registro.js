// Registro
// Variables
const formRegister = document.getElementById('form_register');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const usernameRegister = document.getElementById('username_modal_register');
const emailRegister = document.getElementById('email_modal_register');
const passwordRegister = document.getElementById('password_register');
const password2Register = document.getElementById('password2_register');
const direccion = document.getElementById('direccion');
const cp = document.getElementById('cp');
const ciudad = document.getElementById('ciudad');
const pais = document.getElementById('pais');
const provincia = document.getElementById('provincia');
const nif = document.getElementById('nif');
const phone = document.getElementById('phone');
const btnEnviar = document.getElementById('enviar');
const botonEnviar = document.getElementById('boton-enviar');

// expresion regular para la validacion del NIF
const nifRegExp = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
const str = "TRWAGMYFPDXBNJZSQVHLCKET";
let letraNifCorrecta = false;

// expresion regular para la validación del email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validación de fuerza de contraseña
let upperCase = false;
let lowerCase = false;
let number = false;
let symbol = false;
let caracter;

// Variables para el registro de nuevo usuario
let usuarioId = 0;
let nifValidado = ''
let nameValidado = '';
let surnameValidado = '';
let usernameValidado = '';
let emailValidado = '';
let passwordValidado = '';
let direccionValidado = '';
let cpValidado = '';
let ciudadValidado = '';
let paisValidado = '';
let provinciaValidado = '';
let phoneValidado = '';
let admin = false;

let usuarioRegistrado = [];

// Event listeners
document.addEventListener("DOMContentLoaded", iniciar);

// registrar cliente
formRegister.addEventListener('submit', registrarUsuario);

// Funciones
function iniciar() {
    //Inicialización del formulario
    btnEnviar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');

	name.classList.remove('border-2-green');
	surname.classList.remove('border-2-green');
	usernameRegister.classList.remove('border-2-green');
	emailRegister.classList.remove('border-2-green');
	passwordRegister.classList.remove('border-2-green');
	password2Register.classList.remove('border-2-green');
	direccion.classList.remove('border-2-green');
	cp.classList.remove('border-2-green');
	ciudad.classList.remove('border-2-green');
	pais.classList.remove('border-2-green');
	provincia.classList.remove('border-2-green');
	nif.classList.remove('border-2-green');
	phone.classList.remove('border-2-green');

	// campos del formulario
	name.addEventListener('blur', validarFormulario);
	surname.addEventListener('blur', validarFormulario);
	usernameRegister.addEventListener('blur', validarFormulario);
	emailRegister.addEventListener('blur', validarFormulario);
	passwordRegister.addEventListener('blur', validarFormulario);
	password2Register.addEventListener('blur', validarFormulario);
	direccion.addEventListener('blur', validarFormulario);
	cp.addEventListener('blur', validarFormulario);
	ciudad.addEventListener('blur', validarFormulario);
	pais.addEventListener('blur', validarFormulario);
	provincia.addEventListener('blur', validarFormulario);
	nif.addEventListener('blur', validarFormulario);
	phone.addEventListener('blur', validarFormulario);
}

// Mostrar errores de validación
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

// Validación del NIF
function validarNif(e) {

	if (e.target.id === 'nif') {
		let nifSinLetra = nif.value.slice(0, 8);
		let letraNif = nif.value.slice(8, 10).toUpperCase();

		if (letraNif === str.charAt(nifSinLetra % 23)) {
			// letra Nif correcto
			letraNifCorrecta = true;
		}

		if (nifRegExp.test(nif.value) && letraNifCorrecta) {
			limpiarError(e.target.parentElement);
			letraNifCorrecta = false;

			nif.classList.remove('border-2-red');
			nif.classList.add('border-2-green');
			return nif.value;
		} else {
			nif.classList.remove('border-2-green');
			nif.classList.add('border-2-red');

			mostrarError('NIF/NIE no válido', e.target.parentElement);
			return;
		}
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

// Validar fuerza de la contraseña
function validarFuerzaPassword(e) {

	// https://es.wikipedia.org/wiki/ASCII#Caracteres_imprimibles_ASCII
	if (e.target.type === 'password') {

		for (let i = 0; i < e.target.value.length; i++) {
			caracter = e.target.value.charCodeAt(i);
			if (caracter >= 65 && caracter <= 90) {
				upperCase = true;
			} else if (caracter >= 97 && caracter <= 122) {
				lowerCase = true;
			} else if (caracter >= 48 && caracter <= 57) {
				number = true;
			} else {
				symbol = true;
			}
		}

		if (upperCase === true && lowerCase === true && number === true && symbol === true) {
			//fortaleza adecuada
			limpiarError(e.target.parentElement);

			e.target.classList.remove('border-2-red');
			e.target.classList.add('border-2-green');
			return e.target.value;
		} else {
			e.target.classList.remove('border-2-green');
			e.target.classList.add('border-2-red');

			mostrarError('Debe contener al menos un número, una letra mayúscula, una minúscula y un simbolo', e.target.parentElement);
			return;
		}
	}
}

// validar que las contraseñas coincidan
function validarPasswordsMatch(e) {
	if (e.target.id === 'password2_register') {
		if (passwordRegister.value === password2Register.value) {
			// passwords coinciden
			limpiarError(e.target.parentElement);

			password2Register.classList.remove('border-2-red');
			password2Register.classList.add('border-2-green');
		} else {
			password2Register.classList.remove('border-2-green');
			password2Register.classList.add('border-2-red');

			mostrarError('Las contraseñas no coinciden', e.target.parentElement);
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

    validarNif(e);

    validarEmail(e);

    validarFuerzaPassword(e);

    validarPasswordsMatch(e);

    if ((name.value !== '') && (surname.value !== '') && (usernameRegister.value !== '') && (direccion.value !== '') && (cp.value !== '') && (ciudad.value !== '') && (pais.value !== '') && (provincia.value !== '') && (phone.value !== '') && (er.test(emailRegister.value)) && (upperCase === true && lowerCase === true && number === true && symbol === true) && (passwordRegister.value === password2Register.value) && (nifRegExp.test(nif.value) && !letraNifCorrecta)) {
		// Se supero la validación de todos los campos
		btnEnviar.disabled = false;
		btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
		btnEnviar.classList.add('cursor-pointer');

		// Guardar valores de campos en variables
		usuarioId = usuarios.length + 1;
		nifValidado = nif.value;
		nameValidado = name.value;
		surnameValidado = surname.value;
		usernameValidado = usernameRegister.value.toLowerCase();
		emailValidado = emailRegister.value.toLowerCase();
		passwordValidado = passwordRegister.value;
		direccionValidado = direccion.value;
		cpValidado = cp.value;
		ciudadValidado = ciudad.value;
		paisValidado = pais.value;
		provinciaValidado = provincia.value;
		phoneValidado = phone.value;
		admin = false;
	}
}

// Añadir el nuevo usuario al array de usuarios
function registrarUsuario(e) {
	e.preventDefault();

	const usuario = new Usuario(usuarioId, nifValidado, nameValidado, surnameValidado, usernameValidado, emailValidado, passwordValidado, direccionValidado, cpValidado, ciudadValidado, paisValidado, provinciaValidado, phoneValidado, admin);

	// Guardar el registro del usuario en el array usuarios
	usuarios.push(usuario);
	
	// Guardar el usuario registrado en localStorage
	usuarioRegistrado.push(usuario);
	sincronizarUsuarioStorage();

	// Comunicar que se registro correctamente
	const parrafo = document.createElement('p');
	parrafo.textContent = 'El registro se efectuó correctamente';
	parrafo.classList.add('registrado-ok');

	botonEnviar.appendChild(parrafo);

	setTimeout(() => {
		parrafo.remove();
		formRegister.reset();

		iniciar();

	}, 4000);

	return usuarios;
}

// Agregar el usuario registrado al LocalStorage
function sincronizarUsuarioStorage() {
	localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
	// mostrarUsuario(usuarioRegistrado);
}