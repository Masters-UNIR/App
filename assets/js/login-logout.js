// Mostramos el usuario registrado desde el localStorage
document.addEventListener('DOMContentLoaded', () => {
	usuarioRegistrado = JSON.parse(localStorage.getItem('usuario')) || [];
	if (usuarioRegistrado.length > 0) {
		mostrarUsuario(usuarioRegistrado);
		cambiarLoginPorLogout();
	} else if (usuarioRegistrado.length === 0) {
		cerrarSesion();
	}
})

// Mostramos nombre y apellidos del usuario
function mostrarUsuario(usuarios) {
	const nombreUsuario = document.querySelector('#nombre-usuario');

	const nombre = usuarios.map(usuario => usuario.name);
    const apellidos = usuarios.map(usuario => usuario.surname);

	nombreUsuario.textContent = `${nombre} ${apellidos}`;
}

// Cambiamos en el menú Login por logout
function cambiarLoginPorLogout() {
	const loginLogout = document.querySelector('#login-logout');
	loginLogout.innerHTML = '<a class="nav-link" aria-current="page" href="" id="logout">LOGOUT</a>';
}

// TODO logout
setTimeout(() => {
	const logout = document.querySelector('#logout');
	if (logout) {
		logout.addEventListener('click', cerrarSesion);
	}
}, 600);

// Cambiamos en el menú logout por login borramos el localstorage
function cerrarSesion() {
	const logoutLogin = document.querySelector('#login-logout');

	localStorage.removeItem('usuario');
	
	logoutLogin.innerHTML = '<a class="nav-link" aria-current="page" href="login.html" id="login">LOGIN</a>';

	const nombreUsuario = document.querySelector('#nombre-usuario');
	nombreUsuario.textContent = '';

}