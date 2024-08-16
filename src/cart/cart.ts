import { CartItem } from "../interfaces/cart-item.interface";
import { renderCartList } from "./cart-list";

// Paso 1. Definir la variable del cart que es un array cartItem[] 
export const cartArray: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

// Paso 2. Crear un metodo para agregar un item al cart
interface ItemAddToCart {
  title: string;
  price: number;
  id: number;
}

export const addToCart = ({ title, price, id}: ItemAddToCart) => {
  const itemInCart = cartArray.find((cartItem) => cartItem.id === id);
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    cartArray.push({ title, price, id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};


// Paso 3. Crear un metodo para eliminar un item del cart

export const removeFromCart =  (id: number) => {
  const itemIndex = cartArray.findIndex((cartItem) => cartItem.id === id);

  if (cartArray[itemIndex].quantity > 1) {
    cartArray[itemIndex].quantity -= 1;
  } else {
    cartArray.splice(itemIndex, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};

// Paso 4. Crear un metodo para obtener el total del cart
export const getTotal = () => cartArray.reduce((acc, item) => acc + item.price * item.quantity, 0);
