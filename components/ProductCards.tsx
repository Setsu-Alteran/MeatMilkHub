import React from 'react';
import Image from "next/image";
import { BsCartPlus } from "react-icons/bs";
import styles from '@/styles/ProductCard.module.css'; // CSS модуль для картки продукту
import { useCart } from "@/context/CartContext";

export type ProductItem = {
    id: number;
    title: string;
    src: string,
    price: number
    isInStock: string
    categoryId: number;
    manufacturerId: number; 
};

export type Category = {
  id: number;
  name: string;
}

export type Manufacturer = {
  id: number;
  name: string;
}

// Визначення пропсів для компонента ProductCard
type ProductCardProps = {
    item: ProductItem;
};

export default function ProductCard({ item }: ProductCardProps) {   
  const { addToCart } = useCart(); 
  const isAvailable = item.isInStock === "в наявності";

  return (
   <div className={styles.productCard}> {/* Використовуємо CSS модулі */}
        <h3 className={styles.productTitle}>{item.title}</h3>
        <div className={styles.productImageWrapper}>
            <Image
                src={item.src}
                alt={item.title}
                width={300} // Оптимальний розмір для попереднього перегляду
                height={300}
                layout="responsive" // Зробить зображення адаптивним
                objectFit="cover" // Зображення буде покривати весь простір, обрізаючи зайве
                quality={80} // Якість зображення
            />
        </div>
        <p className={styles.productPrice}>{item.price}</p>
        <p 
          className={`${styles.productStock} ${
            isAvailable ? styles.inStock : styles.outOfStock
          }`}>
            {item.isInStock}
        </p>
        <button 
          className={styles.addToCartButton} 
          disabled={!isAvailable}
          onClick={() => addToCart(item)}>
            <BsCartPlus className={styles.cartIcon} /> {/* Іконка */}
            {isAvailable ? 'Додати до кошика' : 'Немає в наявності'}
        </button>
        {!isAvailable && <p className={styles.notifyMe}>Повідомити про надходження</p>}
    </div>
  );
}