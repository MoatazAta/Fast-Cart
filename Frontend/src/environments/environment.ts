const baseUrl = "http://localhost:3030/api/";

export const environment = {
  production: false,
  productsUrl: baseUrl + "products/",
  productImagesUrl: baseUrl + "products/images/",
  registerUrl: baseUrl + "auth/register",
  loginUrl: baseUrl + "auth/login"
};
