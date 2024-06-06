
/* Función para añadir un nuevo producto */
function addRow() {
    /* Obtenemos los valores dados por el usuario */
    var sku = document.getElementById("sku").value.trim();
    var productName = document.getElementById("productName").value.trim();
    var price = document.getElementById("price").value.trim();

    var skuError = document.getElementById("skuError");
    var productNameError = document.getElementById("productNameError");
    var priceError = document.getElementById("priceError");

    skuError.textContent = "";
    productNameError.textContent = "";
    priceError.textContent = "";

    /* Verificamos que el usuario no haya puesto letras (donde no debería), o espacios en blanco */
    if (sku === "") {
        skuError.textContent = "El SKU no puede estar vacío.";
        return;
    }

    if (isNaN(sku)) {
        skuError.textContent = "Debe ser un número.";
        return;
    }

    if (productName === "") {
        productNameError.textContent = "El nombre no puede estar vacío.";
        return;
    }

    if (price === "") {
        priceError.textContent = "El precio no puede estar vacío.";
        return;
    }

    if (isNaN(price)) {
        priceError.textContent = "Debe ser un número.";
        return;
    }

    /* Que no se repita el SKU */
    var table = document.getElementById("productTable");
    for (var i = 1, row; row = table.rows[i]; i++) {
        if (row.cells[0].innerText === sku) {
            skuError.textContent = "El SKU ya existe.";
            return;
        }
    }

    /* Creamos la nueva Fila */
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = sku;
    cell2.innerHTML = productName;
    cell3.innerHTML = `$${parseFloat(price).toFixed(2)}`;
    cell4.innerHTML = '<button class="deleteBtn">Eliminar</button>';

    /* Le añadimos el evento de eliminar la Fila al botón creado */
    cell4.querySelector('.deleteBtn').addEventListener('click', function() {
        deleteRow(this);
    });

    /* Guardamos los valores de la Fila en LocalStorage */
    var product = {
        sku: sku,
        productName: productName,
        price: price
    };
    var products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    /* Reseteamos los valores */
    document.getElementById("sku").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
}


/* Función para eliminar la fila */
function deleteRow(btn) {
    var row = btn.closest('tr');
    row.parentNode.removeChild(row);

    /* Obtenemos el SKU de la Fila y luego la eliminamos del LocalStorage */
    var skuToDelete = row.cells[0].innerText;
    var products = JSON.parse(localStorage.getItem("products")) || [];
    var updatedProducts = products.filter(function(product) {
        return product.sku !== skuToDelete;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
}


/* Cargamos los productos desde LocalStorage al cargar la página */
window.addEventListener('load', function() {
    var products = JSON.parse(localStorage.getItem("products")) || [];
    var table = document.getElementById("productTable");

    products.forEach(function(product) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = product.sku;
        cell2.innerHTML = product.productName;
        cell3.innerHTML = `$${parseFloat(product.price).toFixed(2)}`;
        cell4.innerHTML = '<button class="deleteBtn">Eliminar</button>';

        /* Le añadimos el evento de eliminar la Fila al botón creado */
        cell4.querySelector('.deleteBtn').addEventListener('click', function() {
            deleteRow(this);
        });
    });
});


/* Añadimos el evento al botón para crear una nueva Fila */
let addProduct = document.querySelector("#addProd");
addProduct.addEventListener("click", addRow);
