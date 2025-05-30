document.addEventListener("DOMContentLoaded", async()=>{


    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data );
        return response.data;
    }
    
    async function fetchproductsBycategory(category) {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log(response.data );
        return response.data;
    }
    
    async function fetchCategories(){
    const response = await fetch("https://fakestoreapi.com/products/categories")
    const data = await response.json();
    return data;
}



    const dowloadedProducts =  await fetchProducts();

    async function populateProducts(flag , customProducts) {
        let products = customProducts;
        const queryParamsObject = getQueryParams();
        if(flag== false){
               if(queryParamsObject['category']){
                  products = await fetchproductsBycategory(queryParamsObject['category']);
               }else{
                products= await fetchProducts();
               }
        }
       
        const productList = document.getElementById("productList")
        
        products.forEach(product =>{
            const productitem = document.createElement("a");
            productitem.target = "_blank";
            productitem.classList.add("product-item" , "text-decoration-none" , "d-inline-block");
            productitem.href= `productDetails.html?id=${product.id}`;

            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");


            productImage.classList.add("product-img");
            productName.classList.add("product-name" ,"text-center");
            productPrice.classList.add("product-price","text-center")

            productName.textContent = product.title.substring(0,12) + "...";
            productPrice.textContent = `₹${product.price}`;

            const imageInsideProductimg = document.createElement("img");
            imageInsideProductimg.src = product.image;

            //appending the divs

            productImage.appendChild(imageInsideProductimg);
            productitem.appendChild(productImage);
            productitem.appendChild(productName);
            productitem.appendChild(productPrice);

            productList.appendChild(productitem);

        })
    }


    async function populateCategories(){
        const categories =  await fetchCategories();
        const categoryList = document.getElementById("Category-list");
        categories.forEach(category => {
            const categoryLink = document.createElement("a");
            categoryLink.classList.add("d-flex", "text-decoration-none");
            categoryLink.textContent= category;
            categoryLink.href =`productlist.html?category=${category}`;
            categoryList.appendChild(categoryLink);
        })
    }

      async function downloadContentAndPopulate(){
        Promise.all([populateProducts(false), populateCategories()])
        .then(() => {
            removeloader();
        });
      }

    downloadContentAndPopulate();

    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {
        const productList = document.getElementById("productList");
        productList.innerHTML= "";
        const minPrice =Number(document.getElementById("min-price").value);
        const maxPrice = Number(document.getElementById("max-price").value);
        const products = dowloadedProducts;
        filteredProducts = products.filter(product=>product.price >= minPrice && product.price <= maxPrice);  
        populateProducts(true , filteredProducts);

    });

    const resetFilter = document.getElementById("clear");
    resetFilter.addEventListener("click", ()=>{
        window.location.reload();
    })
});