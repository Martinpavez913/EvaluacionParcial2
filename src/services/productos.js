const baseUrl = "http://localhost:3000/productos"

export function obtenerProductos(){
    return fetch (baseUrl)
    .then(response => response.json())
}

export function obtenerProducto(id){
    return fetch (baseUrl+"/"+id)
    .then(response => response.json())
}