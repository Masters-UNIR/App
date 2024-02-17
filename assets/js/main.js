document.addEventListener("DOMContentLoaded", function() {
  var productosContainer = document.getElementById("productos");

  // Iterar sobre el array de productos
  productos.forEach(function(producto, index) {
      // Si el índice es menor que 6, mostrar el producto
      if (index < 6) {
          // Crear elementos de tarjeta Bootstrap
          var card = document.createElement("div");
          card.classList.add("col-md-4", "mb-4");

          // El botón abriría una ficha de producto, no diseñada
          var cardContent = `
              <div class="card card-inicio text-center">
                  <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                  <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">${producto.texto}</p>
                      <p class="card-text">Precio: ${producto.preciobaseeu}€</p>
                      <p class="card-text">Descuento: ${producto.descuento}%</p>
                  </div>
                  <div class="card-footer">
                    <a href="#" class="btn btn-info text-center">Leer más</a>
                  </div>
              </div>
          `;

          // Agregar tarjeta al contenedor de productos
          card.innerHTML = cardContent;
          productosContainer.appendChild(card);
      }
  });
});
  