function getQueryParams(){
    const queryParams = new URLSearchParams(window.location.search);
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        return queryParamsObject;
}

function removeloader(){
    const loaderBackdrop= document.getElementById("loader-backdrop");
    loaderBackdrop.style.display = 'none';
}


async function fetchProductByid(id){
   const product =await axios.get(`https://fakestoreapi.com/products/${id}`);
   return product.data;
}

async function fetchCartByid(id){
    const cart = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return cart.data;
}