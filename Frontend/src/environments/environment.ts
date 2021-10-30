const baseUrl = "http://localhost:3001/api/";

export const environment = {
  production: false,
  productsUrl: baseUrl + "products/",
  categoriesUrl: baseUrl + "categories/",
  productImagesUrl: baseUrl + "products/images/",
  cartsUrl: baseUrl + "carts/",
  itemsUrl: baseUrl + "items/",
  registerUrl: baseUrl + "auth/register",
  loginUrl: baseUrl + "auth/login"
};
