document.addEventListener("DOMContentLoaded", function() {
    var productosContainer = document.getElementById("productos");
  
    // Iterar sobre el array de productos
    productos.forEach(function(producto) {
      // Crear elementos de tarjeta Bootstrap
      var card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");
  
      var cardContent = `
        <div class="card">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">Precio: €${producto.preciobaseeu}</p>
            <p class="card-text">Precion con descuento: €${producto.descuento}</p>
            <a href="#" class="btn btn-primary">Añadir</a>
          </div>
        </div>
      `;
  
      // Agregar tarjeta al contenedor de productos
      card.innerHTML = cardContent;
      productosContainer.appendChild(card);
    });
  });