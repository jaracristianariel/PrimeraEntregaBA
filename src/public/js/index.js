const socket = io();

socket.on("productos", productos => {
    const tbody = document.getElementById("productos-body");
    tbody.innerHTML = "";
    productos.forEach(producto => {
        const row = tbody.insertRow();
        row.innerHTML = `
                <td>${producto._id}</td>
                <td>${producto.title}</td> 
                <td>${producto.description}</td>
                <td>${producto.price}</td>
                <td>${producto.thumbnail}</td>
                <td>${producto.code}</td>
                <td>${producto.stock}</td>
                <td>${producto.category}</td>
                `;
    })
});

const formulario = document.getElementById("producto-form");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const titulo = document.getElementById("title").value;
    const descripcion = document.getElementById("description").value;
    const precio = document.getElementById("price").value;
    const codigo = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

    const producto = {
        title: titulo,
        description: descripcion,
        price: precio,
        code: codigo,
        stock: stock,
        category: category,
    };
    socket.emit("agregarProducto", producto);
    formulario.reset();
})