import ProductCard from '@/components/ProductCards';

// (Необов'язково) Ви можете визначити метадані для цієї конкретної сторінки.
// Вони будуть об'єднані з глобальними метаданими з layout.tsx
export const metadata = {
  title: 'Моя Нова Сторінка',
  description: 'Це опис моєї порожньої сторінки в Next.js.',
};

export default function Services() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Послуги</h1>
      <h3>Оптова торгівля</h3>
      <h3>Доставка</h3>
      <h3>Консультації</h3>
      {/* Ви можете додати інші компоненти, HTML-елементи, зображення тощо. */}
      <a href="/">Головна</a>
      
      {/* <ProductCard /> */}
    </div>
  );
}