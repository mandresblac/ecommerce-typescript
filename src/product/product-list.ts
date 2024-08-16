import { addToCart } from "../cart/cart";
import { Product } from "../interfaces/product.interface";

// Paso 1. Obtener la lista de productos desde la api https://fakestoreapi.com/products
const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json() as Product[];
  return products;
};

// Paso 2. Renderizar la lista de productos en el DOM
export const renderProductList = async () => {
  const products = await getProducts(); // trae los productos de la api
  
  // Capturamos elementos del documento Html
  const $productList = document.querySelector("#product-list") as HTMLDivElement;
  const $productTemplate = document.querySelector("#product-template") as HTMLTemplateElement;

  // iteramos los productos
  products.forEach((product) => {
    const clone = createProductCard(product, $productTemplate);
    $productList.appendChild(clone);
  })

};

// Paso 2.1 Crear la tarjeta card con el template html
const createProductCard = (product: Product, $productTemplate: HTMLTemplateElement) => {
  // Desestructuracion
  const { title, id, image, price } = product;

  const clone = $productTemplate.content.cloneNode(true) as HTMLDivElement;

  clone.querySelector("img")!.src = image;
  clone.querySelector("h2")!.textContent = title;
  clone.querySelector("p span")!.textContent = `$${price}`;
  clone.querySelector("button")!.addEventListener("click", () => {
    addToCart({ title, price, id });
  });

  return clone;
}