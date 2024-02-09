// Mostramos el usuario registrado desde el localStorage
document.addEventListener('DOMContentLoaded', () => {
	usuarioRegistrado = JSON.parse(localStorage.getItem('usuario')) || [];
	if (usuarioRegistrado !== []) {
		mostrarUsuario(usuarioRegistrado);
	}
})

// Mostramos nombre y apellidos del usuario
function mostrarUsuario(usuarios) {
	const nombreUsuario = document.querySelector('#nombre-usuario');

	const nombre = usuarios.map(usuario => usuario.name);
    const apellidos = usuarios.map(usuario => usuario.surname);

	nombreUsuario.textContent = `${nombre}`;
}

// TODO logout