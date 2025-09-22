'use client';

import { useState, useRef, useEffect } from 'react';

type AccordionItem = {
  title: string;
  content: string;
};

const items: AccordionItem[] = [
  { title: 'Пункт 1', content: 'Це вміст першого пункту.' },
  { title: 'Пункт 2', content: 'Це вміст другого пункту.' },
  { title: 'Пункт 3', content: 'Це вміст третього пункту.' },
];

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="max-w-md mx-auto border rounded-xl shadow-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionSection
          key={index}
          isActive={activeIndex === index}
          title={item.title}
          content={item.content}
          onClick={() => toggle(index)}
        />
      ))}
    </div>
  );
}

type SectionProps = {
  isActive: boolean;
  title: string;
  content: string;
  onClick: () => void;
};

function AccordionSection({ isActive, title, content, onClick }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [content]);

  return (
    <div className="border-t">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200 transition"
      >
        {title}
      </button>
      <div
        style={{
          maxHeight: isActive ? height : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div ref={ref} className="px-4 py-3 bg-white text-sm text-gray-700">
          {content}
        </div>
      </div>
    </div>
  );
}
