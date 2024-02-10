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
if (minimo) {
    minimo.addEventListener('change', e => {
        datosFiltrado.minimo = e.target.value;
    
        filtrarProducto();
    });
}

// Precio máximo
if (maximo) {
    maximo.addEventListener('change', e => {
        datosFiltrado.maximo = e.target.value;
    
        filtrarProducto();
    });
}

// Descuento
if (descuento) {
    descuento.addEventListener('change', e => {
        datosFiltrado.descuento = e.target.value;
    
        filtrarProducto();
    });
}

// Marca
if (marca) {
    marca.addEventListener('change', e => {
        datosFiltrado.marca = e.target.value;

        filtrarProducto();
    });
}

// Categoria
if (categoria) {
    categoria.addEventListener('change', e => {
        datosFiltrado.categoria = e.target.value;
    
        cargarSubcategorias();
        filtrarProducto();
    });
}

// Subcategoria
if (subcategoria) {
    subCategoria.addEventListener('change', e => {
        datosFiltrado.subCategoria = e.target.value;
    
        filtrarProducto();
    });
}

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
                    <p class="descuento"><span class="tachado text-decoration-line-through">${(preciobaseeu * (rate ? rate : 1)).toFixed(2)}</span> <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span> <span class="porcentaje border rounded p-1">${descuento}%</span></p>
                    <p class="precio">${(precioFinal * (rate ? rate : 1)).toFixed(2)} <span class="divisa">${currencySymbol ? currencySymbol : '€'}</span></p>
                </div>
				<div class="card-footer">
					<a href="#" class="agregar-carrito btn btn-info text-center mt-3" data-id="${productoId}">Añadir al Carrito</a>
				</div>
            </div>
        `;

        productoHTML.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4');

        // se inserta en el HTML
        resultado.appendChild(productoHTML);
    });
}

// Cargar las categorías de forma dinámica en el select correspondiente
function cargarCategorias() {
	const categorias = ["Sistema Nervioso", "Sistema Digestivo", "Sistema Inmune", "Sistema Respiratorio", "Sistema Circulatorio", "Sistema Renal", "Sistema Óseo y Articular", "Sistema Hormonal", "Sistema Reproductor", "Nutricosmética", "Vitaminas, Minerales y Aminoácidos", "Genérico", "General"];

	categorias.sort();

	addOptions(categorias);
}

//Agrega options a un select
function addOptions(array) {
	// const selector = document.getElementsByName(domElement)[0];
	for (let i = 0; i < array.length; i++) {
		const opcion = document.createElement('option');
		opcion.value = array[i];
		opcion.textContent = array[i];
		categoria.appendChild(opcion);
	}
}

// cargar subcategorias de forma dinamica al cargar la categoria
function cargarSubcategorias() {
	// Objeto de ategorías con subcategorías
	const listaSubcategorias = {
		'Sistema Nervioso': ["Imsonio", "Relajante", "Falta de Ánimo", "Energizantes", "Dolor de Cabeza", "Regulador"],
		'Sistema Digestivo': ["Transito Intestinal", "Digestivo", "Antiácidos", "Gases", "Flora Intestinal", "Parásitos Intestinales", "Enzimas Digestivos"],
		'Sistema Inmune': ["Jalea Real", "Alergias", "Echináceas y Propóleos", "Defensas", "Cándidas y Hongos"],
		'Sistema Respiratorio': ["Molestias Garganta", "Antitusivos", "Mucolíticos", "Afecciones Respiratorias", "Respiratorio"],
		'Sistema Circulatorio': ["Rendimiento Intelectual", "Exceso de Azucar", "Colesterol", "Varices y Piernas Cansadas", "Salud Cardiovascular", "Hemorroides", "Tensión Arterial", "Anemias"],
		'Sistema Renal': ["Diuréticos", "Próstata", "Infecciones", "Cálculos", "Pérdidas de Orina"],
		'Sistema Óseo y Articular': ["Antiinflamatorio", "Huesos", "Articulaciones", "Cartílago de Tiburón", "Cremas y Hunguentos", "Dolor"],
		'Sistema Hormonal': ["Menopausia", "Menstruación", "Tiroides"],
		'Sistema Reproductor': ["Estimulantes sexuales", "Embarazo y Lactancia"],
		'Nutricosmética': ["Cuidado del Pelo y Uñas", "Cuidado de la Piel"],
		'Vitaminas, Minerales y Aminoácidos': ["Vitaminas", "Minerales", "Complejos Multinutriéntes", "Aminoácidos", "Oligoelementos"],
        'General': ["Antiinflamatorio"],
        'Genérico': ["Dolor"]
	};

	let categoriaSeleccionada = categoria.value
	// limpiar subcategorias
	subCategoria.innerHTML = `<option value="">Subcategoría</option>`;

	if (categoriaSeleccionada !== '') {
		// Se seleccionan las subcategorias y se ordenan
		categoriaSeleccionada = listaSubcategorias[categoriaSeleccionada];
		categoriaSeleccionada.sort();

		// Insertamos las subcategorias
		categoriaSeleccionada.forEach(function (subcategoria) {
			const opcion = document.createElement('option');
			opcion.value = subcategoria;
			opcion.textContent = subcategoria;
			subCategoria.appendChild(opcion);
		});
	}else {
		// limpiar subcategorias
		subCategoria.innerHTML = `<option value="">Subcategoría</option>`;
	}

}

// Iniciar la carga de dategorias
cargarCategorias();

// Filtrar productos en base a filtros
function filtrarProducto() {
    resultadoFiltrado = productos.filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarDescuento).filter(filtrarMarca).filter(filtrarCategoria).filter(filtrarSubcategoria);

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

function filtrarMarca(producto) {
	const { marca } = datosFiltrado;

	if (marca) {
		return producto.marca === marca;
	}
	return producto;
}

function filtrarCategoria(producto) {
	const { categoria } = datosFiltrado;

	if (categoria) {
		return producto.categoria.indexOf(categoria) >= 0;
	}
	return producto;
}

function filtrarSubcategoria(producto) {
	const { subCategoria } = datosFiltrado;

	if (subCategoria) {
		return producto.subcategoria.indexOf(subCategoria) >= 0;
	}
	return producto;
}
