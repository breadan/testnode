//to display data from api in table in front
let products = [];
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let productDesc = document.querySelector("#productDesc");

getData();

function getData() {
  //put code in function to call it when create change
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.message == "success") {
        products = responseData.data;
        showProducts();
      }
    });
    showProducts()
}

//loop to display
function showProducts() {
  var cartona = ``;
  for (let index = 0; index < products.length; index++) {
    cartona += ` 
 <tr>
    <td>${products[index].id}</td>
    <td>${products[index].name}</td>
    <td>${products[index].price}</td>
    <td>${products[index].description}</td>
    <td> 
        <button onClick='updateProduct(${[
          index,
        ]})' id="update" type="button" class="btn btn-outline-success">Update</button>
        <button onClick='deleteProduct(${
          products[index].id
        })' id="delete" type="button" class="btn btn-outline-danger">Delete</button>
    </td>
</tr>`;
  }
  document.querySelector("#tbody").innerHTML = cartona;
}

//to catch data from inputs
function getInputValue() {
  //create object to send it as json

  let productObj = {
    name: productName.value,
    price: productPrice.value,
    description: productDesc.value,
  };
  apiCRUD("POST", productObj);
}
//convert data to json & send it
function apiCRUD(endPoint, body) {
  // POST request using fetch()
  fetch("http://localhost:3000/products", {
    // Adding method type
    method: endPoint,

    // Adding body or contents to send
    body: JSON.stringify(body),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((data) => {
      if (data.message == "success") {
        getData();
      }
    });
    productName.value = '';
    productPrice.value = '';
    productDesc.value = '';
}

//to catch id
function deleteProduct(id) {
  apiCRUD("DELETE", { id });
}

function updateProduct(index) {
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productDesc.value = products[index].description;
  let obj = {
    name: productName.value,
    price: productPrice.value,
    description: productDesc.value,
  } 
}

