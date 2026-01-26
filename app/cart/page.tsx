"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useForm, Controller } from "react-hook-form";

import styles from "./CartPage.module.css";

type FormValues = {
  name: string;
  phone: string;
  address: string;
};

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalSum = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur", // валідація при втраті фокусу
  });

  const onSubmit  = (data: FormValues) => {

    const itemsList = cart
    .map(item => `${item.title} - ${item.quantity}`)
    .join(";\n ");

    const order = {
      items: cart.map(item => ({
        productId: item.id,
        name: item.title,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      customer: {
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
      totalAmount: totalSum,
    };

    // Далі – відправляєш на сервер або тимчасово в консоль
    console.log("Order created:", order);

    const messageOrder = `
      Замовлення відправлено ✅
      Ви замовили: ${itemsList}
      ------------------------
      Сума замовлення: ${totalSum.toFixed(2)} грн
      Дякуємо ${data.name}, що користуєтеся нашими послугами!
      Очікуйте на доставку протягом 24 годин 🚚
    `
    alert(messageOrder);
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
                <span className={styles.title}>{item.title}</span>
                <span className={styles.price}>{item.price} грн</span>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    ➖
                  </button>
                  <span>  {item.quantity}  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    ➕
                  </button>
                </div>

                {/* Проміжна сума */}
                <span className={styles.removeBtn}>
                  {(item.price * item.quantity).toFixed(2)} грн
                </span>
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>

          <h3>Разом: {totalSum.toFixed(2)} грн</h3>

          <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Ім'я"
              {...register("name", { required: "Введіть ім'я" })}
              className={errors.name ? styles.errorInput : ""}
            />
            {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}

            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Введіть номер телефону",
                pattern: {
                  value: /^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
                  message: "Невірний формат телефону",
                },
              }}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="+380 (00) 000-00-00"
                  placeholder="+380 (__) ___-__-__"
                  className={errors.phone ? styles.errorInput : ""}
                />
              )}
            />
            {errors.phone && <p className={styles.errorText}>{errors.phone.message}</p>}

            <input
              type="text"
              placeholder="Адреса"
              {...register("address", { required: "Введіть адресу" })}
              className={errors.address ? styles.errorInput : ""}
            />
            {errors.address && <p className={styles.errorText}>{errors.address.message}</p>}

            <button type="submit" className={styles.submitBtn}>
              Відправити замовлення
            </button>
          </form>
        </>
      )}
    </div>
  );
}
