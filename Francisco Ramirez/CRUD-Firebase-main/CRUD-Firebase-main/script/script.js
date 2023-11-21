
import { saveProduct, getProducts, getProductListSize, 
    deleteProduct, getProduct, updateProduct } from "./firebase.js";

let addButton = document.getElementById("submitdata");
// Agrega un listener para el evento de click
addButton.addEventListener("click", AddData);

showData();

function validateData(){
    let name=document.getElementById("name").value.trim();
    let price= document.getElementById("price").value.trim();
    let description=document.getElementById("description").value.trim();
    let image=document.getElementById("inputGroupFile01");
    if(name==""){
        document.getElementById("name-error-msg").innerHTML="Debes introduccir el nombre";
        return false;
    }
    else{
        document.getElementById("name-error-msg").innerHTML="";
    }

    if(price==""){
        document.getElementById("price-error-msg").innerHTML="Debes introducir el precio";
        return false;
    }
    else if(parseFloat(price)<=0 || isNaN(parseFloat(price))){
        document.getElementById("price-error-msg").innerHTML="Debes introducir un precio valido";
        return false;
    }
    else{
        document.getElementById("price-error-msg").innerHTML="";
    }

    if(description==""){
        document.getElementById("disc-error-msg").innerHTML="Debes introducir la descripcion";
        return false;
    }
    else if(description.length>100){
        document.getElementById("disc-error-msg").innerHTML="No puedes sobrepasar los 100 caracteres";
        return false;
    }
    else{
        document.getElementById("disc-error-msg").innerHTML="";   
    }

    if(image.files.length==0){
        document.getElementById("image-error-msg").innerHTML="Debes seleccionar una imagen";
        return false;
    }
    else{
        document.getElementById("image-error-msg").innerHTML="";  
    }

    let allowedFormats=/(\.jpg|\.jpeg|\.png|\.webp)$/i;
    if(!allowedFormats.exec(image.files[0].name)){
        document.getElementById("image-error-msg").innerHTML="Debes seleccionar una imagen valida";
        image.value="";
        return false;
    }
    else{
        document.getElementById("image-error-msg").innerHTML="";  
    }

    let fileSize=image.files[0].size/1024;
    if(fileSize>700){
        document.getElementById("image-error-msg").innerHTML="Tamaño maximo de archivo es 700 KB";
        image.value="";
        return false;
    }
    else{
        document.getElementById("image-error-msg").innerHTML="";  
    }



    return true;
}

async function AddData(){
    if(validateData()){ 
        // Leyendo los valores de los campos
        let name=document.getElementById("name").value;
        let price= document.getElementById("price").value;
        let description=document.getElementById("description").value;
        let image=document.getElementById("inputGroupFile01");
        let reader=new FileReader();
        reader.readAsDataURL(image.files[0]);
        reader.addEventListener("load",()=>{
            // Guardamos el registro en firebase
            saveProduct({
                name,price,description,image:reader.result
            });
        });

        // Limpiando campos
        document.getElementById("name").value="";
        document.getElementById("price").value="";
        document.getElementById("description").value="";
        document.getElementById("inputGroupFile01").value="";
        // Cerrando el modal
        document.getElementById("close-btn").click();
        alertify.success('Producto añadido al Catalogo');
        showData();
    }
}

async function showData(){
    
    let html="";
    // Recuperando el tamaño de la lista de productos
    let size= await getProductListSize();

    if(size==0){ // Si no hay productos en la colección
        html=`<div class="card-body">
                <div class="row gx-2">
                <div class="col">
                <div class="p-3">
                    <img src="img/no-data-found.png" class="img-fluid d-block">
                </div></div></div></div>`;
        
    }
    else{ // Si hay productos
        //Recuperando los productos
        const productList= await getProducts();
        productList.forEach(element => {
            console.log(element);
            const product=element.data();
            html+=`<div>
                    <div class="row gx-2">
                        <div class="col">
                            <div class="p-3">
                            <div class="card d-flex card-all">
                            <div class="card-body" style="height:11 rem; width:16rem">
                            <h5 class="card-title text-center"> ${product.name}</h5>
                            <img src="${product.image}" class="card-img-top">
                            </div>
                            <ul class="list-group">
                             <li class="list-group-item"><strong>Precio:</strong> $${product.price}</li>
                             <li class="list-group-item"><strong>Descripcion:</strong> ${product.description}</li>
                             </ul>
                             <div class="card-body text-center">
                             <button class="btn btn-success btn-edit" data-id="${element.id}" data-bs-toggle='modal' data-bs-target='#exampleModal-2'>Editar</button>
                             <button class="btn btn-danger btn-delete" data-id="${element.id}">Borrar</button>


                             </div>
                            </div></div></div></div></div>
            `;
        });
    }
    document.getElementById("crud-table").innerHTML=html;
    //Recuperando todos los botones con la clase btn-delete
    const btnsDelete= document.getElementById("crud-table").querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn=>{
        // Asociando un manejador de eventos para el evento click
        btn.addEventListener('click',(event)=>{
            alertify.confirm("Confirmation","Do you want to delete this product?",
                function(){
                    deleteProduct(event.target.dataset.id);
                    alertify.success('Product deleted succesfully');
                    showData();
                },
                function(){
                });
           
        })
    })
    //Recuperar todos los botones con la clase btn-edit
    const btnsEdits= document.getElementById("crud-table").querySelectorAll('.btn-edit');
    btnsEdits.forEach(btn=>{
        btn.addEventListener('click',async(event)=>{

            //Recuperando el producto a partir del id
            let prod=await getProduct(event.target.dataset.id);
            // Guardando el id del producto
            let id=prod.id;
            // Recuperando exclusivamente los datos del producto
            prod=prod.data();
            console.log(prod);
            document.getElementById("id-edit").value = id;
            document.getElementById("name-edit").value = prod.name;
            document.getElementById("price-edit").value = prod.price;
            document.getElementById("description-edit").value =prod.description;

            let imagePreview = document.getElementById("image-div");
            imagePreview.src = prod.image;
            document.getElementById("image-div").innerHTML =
                "<img src=" + prod.image + " width='100%' height='100%'>";
                })
    })
}

document.querySelector("#update").onclick = function () {
    const id = document.getElementById("id-edit").value;
    const name = document.getElementById("name-edit").value;
    const price = document.getElementById("price-edit").value;
    const description = document.getElementById("description-edit").value;
    updateProduct(id,{name,price,description})
    showData();
    document.getElementById("btn-close").click();
    document.getElementById("id-edit").value = "";
    document.getElementById("name-edit").value = "";
    document.getElementById("price-edit").value = "";
    document.getElementById("description-edit").value = "";
    alertify.success("Producto Actualizado");
};







