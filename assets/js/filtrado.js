// Variables
// Selects de filtrado
const minimo = document.querySelector('#precio-min');
const maximo = document.querySelector('#precio-max');
const categoria = document.querySelector('#categoria');
const subCategoria = document.querySelector('#subcategoria');
const marca = document.querySelector('#marca');
const descuento = document.querySelector('#descuento');

// Select de ordenación de los productos
const ordenar = document.querySelector('#ordenar');

// Indica tipo de ordenación de los productos
let ordenadoPor = '';

// contenedor para los resultados
const resultado = document.querySelector('#resultado');

// Generamos un objeto con el filtrado
const datosFiltrado = {
	minimo: '',
	maximo: '',
	categoria: '',
	subCategoria: '',
	marca: '',
	descuento: ''
}

let resultadoFiltrado = productos;

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    // Mostramos los productos al cargar la página
    mostrarProductos(resultadoFiltrado, rate, currencySymbol);
});

// Escucha de eventos para los selects de filtrado
// Precio mínimo
minimo.addEventListener('change', e => {
    datosFiltrado.minimo = e.target.value;

    filtrarProducto();
});

// Precio máximo
maximo.addEventListener('change', e => {
	datosFiltrado.maximo = e.target.value;

	filtrarProducto();
});

// Descuento
descuento.addEventListener('change', e => {
    datosFiltrado.descuento = e.target.value;

    filtrarProducto();
})

// Limpiar el contenido del ul #resultado
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Muestra los productos
function mostrarProductos(productos, rate = 1, currencySymbol) {

    // Limpiamos el HTML previo
    limpiarHTML();

    // generamos los productos dinamicamente a partir del array de productos
    productos.forEach(producto => {
        // destructuring del objeto producto
        const { productoId, nombre, marca, presentacion, preciobaseeu, descuento, imagen } = producto;

        // Calculo del precio final del producto
        let precioFinal = (preciobaseeu - ((preciobaseeu * descuento) / 100)).toFixed(2);

        // creamos un item por producto
        const productoHTML = document.createElement('li');

        // generamos un card por producto con sus datos
        productoHTML.innerHTML = `
            <div class="card-producto">
                <picture>
                    <img src="${imagen}" alt="">
                </picture>
                <div class="card-body">
                    <p class="nombre">${nombre}</p>
                    <p class="marca">${marca}</p>
                    <p class="presenta">${presentacion}</p>
                    <p class="descuento"><span class="tachado">${(preciobaseeu * (rate ? rate : 1)).toFixed(2)}</span> <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span> <span class="porcentaje">${descuento}%</span></p>
                    <p class="precio">${(precioFinal * (rate ? rate : 1)).toFixed(2)} <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span></p>
                    <a href="#" class="agregar-carrito" data-id="${productoId}">Añadir al Carrito</a>
                </div>
            </div>
        `;

        // se inserta en el HTML
        resultado.appendChild(productoHTML);
    });
}

// Filtrar productos en base a filtros
function filtrarProducto() {
    resultadoFiltrado = productos.filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarDescuento);

    // comprobamos que hay resultados de los filtros
    if (resultadoFiltrado.length) {

        // comprobamos si estan ordenados por algún criterio
        if (ordenadoPor) {
            // TODO mostrar casos posibles de ordenación con un switch
        } else {
            // mostrar los productos filtrados
            mostrarProductos(resultadoFiltrado, rate, currencySymbol);
        }
        return resultadoFiltrado;
    } else {
        // No hay resultados tras el filtrado
        noResultados();
    }
}

// Cuando no hay resultados en el filtrado
function noResultados() {
    limpiarHTML();

    const noResultados = document.createElement('div');
	noResultados.classList.add('error');
	noResultados.textContent = 'No Hay Resultados';
	resultado.appendChild(noResultados);
}

// Funciones de filtrado
function filtrarMinimo(producto) {
    const { minimo } = datosFiltrado;

    if (minimo) {
        return producto.preciobaseeu >= minimo;
    }
    return producto;
}

function filtrarMaximo(producto) {
    const { maximo } = datosFiltrado;

    if (maximo) {
		return producto.preciobaseeu <= maximo;
	}
	return producto;
}

function filtrarDescuento(producto) {
    let { descuento } = datosFiltrado;

    descuento = Number(descuento);

    if (descuento) {
        return ((producto.descuento >= descuento) && (producto.descuento <= (descuento + 9)));
    }
    return producto;
}