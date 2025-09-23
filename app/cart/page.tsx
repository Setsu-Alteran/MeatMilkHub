"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const handleSubmit = () => {
    const order = {
      customer: { name, phone, address },
      items: cart,
      total,
    };
    console.log("Нове замовлення:", order);
    alert("Замовлення відправлено (див. console.log)");
    clearCart();
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Кошик</h1>

      {cart.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cart.map(item => (
              <li key={item.id} className={styles.cartItem}>
                <span>{item.title}</span>
                <span>{item.price} грн</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
                <button onClick={() => removeFromCart(item.id)}>Видалити</button>
              </li>
            ))}
          </ul>

          <h3>Разом: {total.toFixed(2)} грн</h3>

          <div className={styles.orderForm}>
            <input
              type="text"
              placeholder="Ім'я"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Адреса"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <button onClick={handleSubmit}>Відправити замовлення</button>
          </div>
        </>
      )}
    </div>
  );
}
