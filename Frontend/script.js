document.querySelector('.filter-btn').addEventListener('click', () => {
    const categoria = document.getElementById('categoryFilter').value;
    const precioRange = document.getElementById('priceFilter').value;

    // Realizar la solicitud al backend
    fetch(`http://localhost:3000/api/productos?categoria=${categoria}&precioRange=${precioRange}`)
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(err => console.error('Error al obtener los productos:', err));
});

//Funcion para obtener la busqueda del usuario 
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.trim(); // Captura el término de búsqueda

    if (searchTerm) {
        // Realizar la solicitud al backend con el término de búsqueda
        fetch(`/api/buscar-productos?query=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())  // Convertir la respuesta en formato JSON
            .then(data => {
                console.log(data);  // Mostrar los datos en la consola para depuración
                displayProducts(data);  // Función para mostrar los productos en la página
            })
            .catch(error => console.error('Error:', error));  // Captura cualquier error
    } else {
        console.log('Por favor, ingrese un término de búsqueda.');
    }
}
// Función para obtener todos los productos
function cargarProductos() {
    fetch('http://localhost:3000/api/productos')
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(err => console.error('Error al cargar los productos:', err));
}

// Función para mostrar los productos en la página (ya existente)
function mostrarProductos(productos) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; // Limpiar productos anteriores

    productos.forEach(producto => {
        // Formatear el precio y el descuento
        const precio = producto.precio;
        const descuento = producto.descuento;
        const precioConDescuento = precio - (precio * (descuento / 100));

        // Crear el HTML para cada producto
        const productoHTML = `
            <div class="product-card">
                <img src="${producto.imagen_url}" alt="${producto.nombre}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${producto.nombre}</h3>
                    <p class="price">
                        $${precioConDescuento.toLocaleString()} 
                        <span class="discount">$${precio.toLocaleString()}</span>
                    </p>
                    <p class="rating">★★★★☆</p>
                </div>
            </div>
        `;

        // Insertar el HTML generado en el contenedor de productos
        container.innerHTML += productoHTML;
    });
}

function applyFilters() {
    const priceRange = document.getElementById('priceFilter').value; // Obtener el valor seleccionado

    // Realizar la solicitud al backend con el rango de precio
    fetch(`/api/productos?precioRange=${priceRange}`)
        .then(response => response.json())  // Convertir la respuesta en formato JSON
        .then(data => {
            // Aquí puedes procesar los datos y mostrarlos en la página
            console.log(data);  // Para depuración, ver qué datos se recibieron
            displayProducts(data);  // Supongamos que tienes una función para mostrar productos
        })
        .catch(error => console.error('Error:', error));  // Captura errores si los hay
}
function displayProducts(products) {
    const productsContainer = document.getElementById('productsContainer'); // Un contenedor en tu HTML para mostrar los productos
    productsContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos productos

    products.forEach(product => {
        // Crear un nuevo elemento HTML para cada producto
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        
        productElement.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <p class="price">$${product.precio}</p>
                <p class="rating">★★★★☆</p>
            </div>
        `;

        // Agregar el producto al contenedor
        productsContainer.appendChild(productElement);
    });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

