document.addEventListener("DOMContentLoaded", ()=>{
     async function populateproduct(){
        const queryParams = getQueryParams();
        if(queryParams['id']){
            const productId = queryParams['id'];
            const product = await fetchProductByid(productId);
          
            const productName  = document.getElementById("product-name");
            const productPrice  = document.getElementById("product-price");
            const productDesc  = document.getElementById("product-descriprion-data");
            const productImg  = document.getElementById("product-img");

            productName.textContent= product.title;
            productDesc.textContent = product.description;
            productImg.src = product.image;
            productPrice.textContent = `₹${product.price}`;
            removeloader();

        }
      }
      populateproduct(); 
});

