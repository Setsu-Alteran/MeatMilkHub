'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard, { ProductItem, Manufacturer, Category } from '@/components/ProductCards';
import styles from './ProductsPage.module.css';

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
  { id: 15, name: "Напівфабрикати від Шефа" },
];

const allProductsData: ProductItem[] = [
  { id: 0, title: 'Сир Моцарелла 0.5 кг', src: '/images/chees.jpg', price: 175.00, isInStock: 'в наявності', categoryId: 1, manufacturerId: 1 },
  { id: 1, title: 'Сир Моцарелла 1 кг', src: '/images/chees.jpg', price: 350.00, isInStock: 'в наявності', categoryId: 1, manufacturerId: 1 },
  { id: 2, title: 'Сир Чеддер 0.5 кг', src: '/images/chees.jpg', price: 200.00, isInStock: 'в наявності', categoryId: 1, manufacturerId: 2 },
  { id: 3, title: 'Сир Чеддер 1 кг', src: '/images/chees.jpg', price: 400.00, isInStock: 'в наявності', categoryId: 1, manufacturerId: 2 },
  { id: 4, title: 'Сир Пармезан 0.5 кг', src: '/images/chees.jpg', price: 250.00, isInStock: 'в наявності', categoryId: 1, manufacturerId: 3 },
  { id: 5, title: 'Сир Пармезан 1 кг', src: '/images/chees.jpg', price: 500.00, isInStock: 'в наявності', categoryId: 1, manufacturerId: 3 },
  { id: 6, title: 'Ковбаса "Домашня" 0.5 кг', src: '/images/sausage.jpeg', price: 90.00, isInStock: 'в наявності', categoryId: 2, manufacturerId: 4 },
  { id: 7, title: 'Ковбаса "Домашня" 1 кг', src: '/images/sausage.jpeg', price: 180.00, isInStock: 'в наявності', categoryId: 2, manufacturerId: 4 },
  { id: 8, title: 'Ковбаса "Салямі" 0.5 кг', src: '/images/sausage.jpeg', price: 125.00, isInStock: 'немає в наявності', categoryId: 2, manufacturerId: 5 },
  { id: 9, title: 'Ковбаса "Салямі" 1 кг', src: '/images/sausage.jpeg', price: 250.00, isInStock: 'немає в наявності', categoryId: 2, manufacturerId: 5 },
  { id: 10, title: 'Шинка 0.5 кг', src: '/images/sausage.jpeg', price: 110.00, isInStock: 'в наявності', categoryId: 2, manufacturerId: 6 },
  { id: 11, title: 'Шинка 1 кг', src: '/images/sausage.jpeg', price: 220.00, isInStock: 'в наявності', categoryId: 2, manufacturerId: 6 },
  { id: 12, title: 'Крупи Гречані 1 кг', src: '/images/krupu_yashuku.jpg', price: 20.00, isInStock: 'в наявності', categoryId: 3, manufacturerId: 7 },
  { id: 13, title: 'Рис Басматі 1 кг', src: '/images/krupu_yashuku.jpg', price: 35.00, isInStock: 'в наявності', categoryId: 3, manufacturerId: 8 },
  { id: 14, title: 'Заморожені овочі 1 кг', src: '/images/frozen_mixed_vegetables.jpg', price: 100.00, isInStock: 'в наявності', categoryId: 4, manufacturerId: 10 },
  { id: 15, title: 'Заморожені фрукти 1 кг', src: '/images/frozen_fruits.jpg', price: 120.00, isInStock: 'в наявності', categoryId: 4, manufacturerId: 11 },
  { id: 16, title: 'Напівфабрикати Вареники 1 кг', src: '/images/dumplings.jpg', price: 80.00, isInStock: 'в наявності', categoryId: 5, manufacturerId: 13 },
  { id: 17, title: 'Напівфабрикати Пельмені 1 кг', src: '/images/pelmeni.jpg', price: 90.00, isInStock: 'в наявності', categoryId: 5, manufacturerId: 14 },
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryName = useMemo(() => searchParams.get('category') || 'Всі продукти', [searchParams]);

  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOptin, setSortOption] = useState<string>('defaul');
  const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(null);

  const categoryMap = useMemo(() => {
    return new Map(categories.map(cat => [cat.name, cat.id]));
  }, []);

  const filteredManufacturers = useMemo(() => {
    if (currentCategoryName === 'Всі продукти') {
      return manufacturers;
    }

    const categoryId = categoryMap.get(currentCategoryName);
    if (categoryId === undefined) return manufacturers;

    // беремо виробників тільки з поточних продуктів
    const manufacturerIds = allProductsData
      .filter(p => p.categoryId === categoryId)
      .map(p => p.manufacturerId);

    return manufacturers.filter(m => manufacturerIds.includes(m.id));
  }, [currentCategoryName, categoryMap]);


  useEffect(() => {
  setLoading(true);
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

    if (selectedManufacturer) {
      productsToDisplay = productsToDisplay.filter(
        product => product.manufacturerId === selectedManufacturer
      );
    }

    if (sortOptin === 'price-asc') {
      productsToDisplay.sort((a,b) => a.price - b.price);
    } else if (sortOptin === 'price-desc') {
      productsToDisplay.sort((a,b) => b.price - a.price);
    } else if (sortOptin === 'name-asc') {
      productsToDisplay.sort((a,b) => a.title.localeCompare(b.title));
    } else if (sortOptin === 'name-desc') {
      productsToDisplay.sort((a,b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(productsToDisplay);
    setLoading(false);
  }, 300);

  return () => clearTimeout(timer);
}, [currentCategoryName, categoryMap, sortOptin, selectedManufacturer]);


  const handleCategoryChange = useCallback((categoryName: string) => {
    setSelectedManufacturer(null);
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

      <div className={styles.manufacturerFilter}>
        <label htmlFor="manufacturer">Виробник:</label>
        <select
          id="manufacturer"
          value={selectedManufacturer ?? ""}
          onChange={(e) => setSelectedManufacturer(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Всі виробники</option>
          {filteredManufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

        <div className = {styles.sortContainer}>
          <label htmlFor="sort">Сортувати:  </label>
          <select 
            value={sortOptin} 
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="defaul">Без сортування</option>
            <option value="price-asc">Ціна: за зростанням</option>
            <option value="price-desc">Ціна: за спаданням</option>
            <option value="name-asc">Назва:А → Я</option>
            <option value="name-desc">Назва:Я → А</option>
          </select>
        </div>

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