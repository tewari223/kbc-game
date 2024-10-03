document.addEventListener('DOMContentLoaded', (event) => {
    var categorydata;
    var string = getQueryStringValue('category');

    if (string) {
        fetchcategory(string);
    }

    function getQueryStringValue(key) {
        return new URLSearchParams(window.location.search).get(key);
    }

    function fetchcategory(category) {
        let req = new XMLHttpRequest();
        let url = "https://fakestoreapi.com/products/category/" + encodeURIComponent(category);

        req.open("GET", url, true);
        req.send(null);

        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {

                categorydata = JSON.parse(req.responseText);

                displaycategories(categorydata);
            }
        };
    }

    function displaycategories(categorydata) {
        var c = document.getElementById("shopc");

     
        for (let i = 0; i < categorydata.length; i++) {
            c.innerHTML += `
            
            <div class="col-md-4">
                <div class="card mb-4 product-wap rounded-0">
                    <div class="card rounded-0" style="height:500px;">
                     <div ><img class="card-img rounded-0 img-fluid " style="height:300px" src=${categorydata[i].image}></div>
                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center" style="height:100%">
                            <ul class="list-unstyled">
                                <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html?id=${categorydata[i].id}"><i class="far fa-eye"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html?id=${categorydata[i].id}"><i class="fas fa-cart-plus"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body">
                        <a href="shop-single.html?id=${categorydata[i].id}" class="h3 text-decoration-none" >${categorydata[i].title}</a>
                        <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                           
                            <li class="pt-2">
                                <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                            </li>
                        </ul>
                        <ul class="list-unstyled d-flex justify-content-center mb-1">
                            <li>
                                  <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-warning fa fa-star"></i>
                                    <i class="text-muted fa fa-star"></i>
                                    <i class="text-muted fa fa-star"></i>
                            </li>
                        </ul>
                        <p class="text-center mb-0">$${categorydata[i].price}</p>
                    </div>
                </div>
            </div>
            `;
        }
       
    }


    
 
});


