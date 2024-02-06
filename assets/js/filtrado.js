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

// TODO filtros para categoría, subcategoría y marca

// Evento para la ordenación
ordenar.addEventListener('change', ordenarProductos);

// Funciones
// Ordenar Productos
function ordenarProductos(e) {
    switch (e.target.value) {
		case 'pa':
			ordenarPrecioMenorMayor();
			ordenadoPor = 'pa';
			break;
		case 'pd':
			ordenarPrecioMayorMenor();
			ordenadoPor = 'pd';
			break;
        case 'na':
            ordenarNombreAscendente();
            ordenadoPor = 'na';
            break;
        case 'nd':
            ordenarNombreDescendente();
            ordenadoPor = 'nd';
            break;
		default:
			ordenadoPor = '';
			break;
	}
}

// Ordenar productos por precio de menor a mayor
const ordenarPrecioMenorMayor = () => {
    if (resultadoFiltrado) {
        const resultadoOrdenado = resultadoFiltrado.sort((a, b) => a.preciobaseeu - b.preciobaseeu);
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
    }
}

// Ordenar productos por precio de mayor a menor
const ordenarPrecioMayorMenor = () => {
	if (resultadoFiltrado) {
		const resultadoOrdenado = resultadoFiltrado.sort((a, b) => b.preciobaseeu - a.preciobaseeu);
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
	}
}

// Ordenar productos por nombre ascendente alfabeticamente
const ordenarNombreAscendente = () => {
	if (resultadoFiltrado) {
		const resultadoOrdenado = resultadoFiltrado.sort((a, b) => {
			if (a.nombre > b.nombre) {
				return 1;
			}
			if (a.nombre < b.nombre) {
				return -1;
			}

			return 0;
		});
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
	}
}

// Ordenar productos por nombre descendente alfabeticamente
const ordenarNombreDescendente = () => {
	if (resultadoFiltrado) {
		const resultadoOrdenado = resultadoFiltrado.sort((a, b) => {
			if (a.nombre < b.nombre) {
				return 1;
			}
			if (a.nombre > b.nombre) {
				return -1;
			}

			return 0;
		});
		mostrarProductos(resultadoOrdenado, rate, currencySymbol);
	}
}

// Limpiar el contenido del ul #resultado
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Muestra los productos
function mostrarProductos(productos, rate, currencySymbol) {

    // Limpiamos el HTML previo
    limpiarHTML();

    // generamos los productos dinamicamente a partir del array de productos
    productos.forEach(producto => {
        // destructuring del objeto producto
        const { productoId, nombre, texto, marca, presentacion, preciobaseeu, descuento, imagen } = producto;

        // Calculo del precio final del producto
        let precioFinal = (preciobaseeu - ((preciobaseeu * descuento) / 100)).toFixed(2);

        // creamos un item por producto
        const productoHTML = document.createElement('li');

        // generamos un card por producto con sus datos
        productoHTML.innerHTML = `
            <div class="card-producto card text-center">
                <img src="${imagen}" alt="">
                <div class="card-body">
                    <h5 class="nombre card-title">${nombre}</h5>
                    <p class="card-text">${texto}</p>
                    <p class="marca">${marca}</p>
                    <p class="presenta">${presentacion}</p>
                    <p class="descuento"><span class="tachado">${(preciobaseeu * (rate ? rate : 1)).toFixed(2)}</span> <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span> <span class="porcentaje">${descuento}%</span></p>
                    <p class="precio">${(precioFinal * (rate ? rate : 1)).toFixed(2)} <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span></p>
                    <a href="#" class="agregar-carrito" data-id="${productoId}">Añadir al Carrito</a>
                </div>
            </div>
        `;

        productoHTML.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4');

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
            switch (ordenadoPor) {
				case 'pa':
					ordenarPrecioMenorMayor();
					ordenadoPor = 'pa';
					break;
				case 'pd':
					ordenarPrecioMayorMenor();
					ordenadoPor = 'pd';
					break;                   
                case 'na':
					ordenarNombreAscendente();
					ordenadoPor = 'na';
					break;
				case 'nd':
					ordenarNombreDescendente();
					ordenadoPor = 'nd';
					break;
				default:
					ordenadoPor = '';
					break;
			}

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