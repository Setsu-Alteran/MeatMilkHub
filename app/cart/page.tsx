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

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

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

    const order = itemsList;
    const messageOrder = `
      Замовлення відправлено ✅
      Ви замовили: ${itemsList}
      ------------------------
      Сума замовлення: ${total.toFixed(2)} грн
      Дякуємо ${data.name}, що користуєтеся нашими послугами!
      Очікуйте на доставку протягом 24 годин 🚚
    `
    console.log(order);
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
