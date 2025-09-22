'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard, { ProductItem, Manufacturer, Category } from '@/components/ProductCards';
import styles from '@/styles/ProductsPage.module.css';

// --- Дані продуктів ---

const categories: Category[] = [
  { id: 0, name: 'Всі продукти' }, // Додано "Всі продукти"
  { id: 1, name: 'Сири' },
  { id: 2, name: 'Ковбаса' },
  { id: 3, name: 'Крупи' },
  { id: 4, name: 'Заморозка' },
  { id: 5, name: 'Напівфабрикати' }
];

const manufacturers: Manufacturer[] = [
  { id: 1, name: "Сирна Країна" },
  { id: 2, name: "Cheese Delight" },
  { id: 3, name: "Фермерські Сири" },
  { id: 4, name: "М'ясний Двір" },
  { id: 5, name: "Sausage Masters" },
  { id: 6, name: "Ковбасний Рай" },
  { id: 7, name: "Зерновий Світ" },
  { id: 8, name: "Grain Harvest" },
  { id: 9, name: "Круп'яний Дім" },
  { id: 10, name: "Лід та Сніг" },
  { id: 11, name: "Frozen Fresh" },
  { id: 12, name: "Заморожені Смаколики" },
  { id: 13, name: "Готові Страви" },
  { id: 14, name: "Ready Meal Co." },
  { id: 15, name: "Напівфабрикати від Шефа" }
];

const allProductsData: ProductItem[] = [
  { id: 0, title: 'Сир Моцарелла', src: '/images/chees.jpg', price: 'Від 350 грн/кг', isInStock: 'в наявності', categoryId: 1, manufacturerId: 2 },
  { id: 1, title: 'Сир Чеддер', src: '/images/chees.jpg', price: 'Від 400 грн/кг', isInStock: 'в наявності', categoryId: 1, manufacturerId: 3 },
  { id: 2, title: 'Сир Пармезан', src: '/images/chees.jpg', price: 'Від 500 грн/кг', isInStock: 'в наявності', categoryId: 1, manufacturerId: 2 },
  { id: 3, title: 'Ковбаса "Домашня"', src: '/images/sausage.jpeg', price: 'Від 180 грн/кг', isInStock: 'в наявності', categoryId: 2, manufacturerId: 4 },
  { id: 4, title: 'Ковбаса "Салямі"', src: '/images/sausage.jpeg', price: 'Від 250 грн/кг', isInStock: 'немає в наявності', categoryId: 2, manufacturerId: 5 },
  { id: 5, title: 'Шинка', src: '/images/sausage.jpeg', price: 'Від 220 грн/кг', isInStock: 'в наявності', categoryId: 2, manufacturerId: 6 },
  { id: 6, title: 'Крупи Гречані', src: '/images/krupu_yashuku.jpg', price: 'Від 20 грн/кг', isInStock: 'в наявності', categoryId: 3, manufacturerId: 7 },
  { id: 7, title: 'Рис Басматі', src: '/images/krupu_yashuku.jpg', price: 'Від 35 грн/кг', isInStock: 'в наявності', categoryId: 3, manufacturerId: 8 },
  { id: 8, title: 'Заморожені овочі', src: '/images/frozen_mixed_vegetables.jpg', price: 'Від 100 грн/кг', isInStock: 'в наявності', categoryId: 4, manufacturerId: 10 },
  { id: 9, title: 'Заморожені фрукти', src: '/images/frozen_fruits.jpg', price: 'Від 120 грн/кг', isInStock: 'в наявності', categoryId: 4, manufacturerId: 11 },
  { id: 10, title: 'Напівфабрикати Вареники', src: '/images/dumplings.jpg', price: 'Від 80 грн/кг', isInStock: 'в наявності', categoryId: 5, manufacturerId: 13 },
  { id: 11, title: 'Напівфабрикати Пельмені', src: '/images/pelmeni.jpg', price: 'Від 90 грн/кг', isInStock: 'в наявності', categoryId: 5, manufacturerId: 14 },
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Використовуємо useMemo для мемоізації currentCategory.
  // Це запобігає зайвим перерендерам, якщо searchParams не змінюються.
  const currentCategoryName = useMemo(() => searchParams.get('category') || 'Всі продукти', [searchParams]);

  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Створення мапи категорій для швидкого доступу за іменем
  const categoryMap = useMemo(() => {
    return new Map(categories.map(cat => [cat.name, cat.id]));
  }, []);

  useEffect(() => {
    setLoading(true);
    // Імітація завантаження даних. У реальному додатку тут був би fetch.
    const timer = setTimeout(() => {
      let productsToDisplay: ProductItem[] = [];

      if (currentCategoryName === 'Всі продукти') {
        productsToDisplay = allProductsData;
      } else {
        const categoryId = categoryMap.get(currentCategoryName);
        if (categoryId !== undefined) {
          productsToDisplay = allProductsData.filter(
            product => product.categoryId === categoryId
          );
        }
      }
      setFilteredProducts(productsToDisplay);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentCategoryName, categoryMap]); // Залежність від categoryMap та currentCategoryName

  // Використовуємо useCallback для мемоізації функції handleCategoryChange.
  // Це допомагає запобігти зайвим перерендерам дочірніх компонентів, якщо вони використовують цю функцію.
  const handleCategoryChange = useCallback((categoryName: string) => {
    router.push(`/products?category=${categoryName}`);
  }, [router]);

  return (
    <div className={styles.productsPageContainer}>
      <h1 className={styles.pageTitle}>Наші Продукти</h1>

      <nav className={styles.categoryNav}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${currentCategoryName === category.name ? styles.active : ''}`}
            onClick={() => handleCategoryChange(category.name)}
          >
            {category.name}
          </button>
        ))}
      </nav>

      <div className={styles.productsGrid}>
        {loading ? (
          <p className={styles.loadingMessage}>Завантаження продуктів...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
          <p className={styles.noProductsMessage}>Продуктів у цій категорії поки немає.</p>
        )}
      </div>
    </div>
  );
}