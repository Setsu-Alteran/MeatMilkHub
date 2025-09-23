// components/Header.tsx
import Link from 'next/link';
import React from 'react';
import { IoMdPeople } from "react-icons/io";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaBoxOpen , FaPhoneVolume} from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
   <header>    
        <a href="/" className="logo">MeatMilkHub</a>
        
        <nav className="nav">
            <div className="dropdown">
                <a href="/about" className="dropdown-btn">
                    <IoMdPeople /> Про нас
                </a>                
            </div>
            {/*<div className="dropdown">
                <a href="/services" className="dropdown-btn">
                    <MdOutlineBusinessCenter /> Послуги
                </a>
                 <div className="dropdown-menu">
                    <a href="/services#">Оптова торгівля</a>
                    <a href="/services#">Доставка</a>
                    <a href="/services#">Консультації</a>
                </div> 
            </div>*/}
            <div className="dropdown">
                <a href="/products" className="dropdown-btn">
                    <FaBoxOpen /> Продукти
                </a>
                {/* <div className="dropdown-menu">
                    <a href="#">Ковбаса</a>
                    <a href="#">Сири</a>
                    <a href="#">Крупи</a>
                    <a href="#">Заморозка</a>
                    <a href="#">Напівфабрикати</a>
                </div> */}
            </div><div className="dropdown">
                <a href="/contacts" className="dropdown-btn">
                   <FaPhoneVolume /> Контакти
                </a>
                {/* <div className="dropdown-menu">
                    <a href="/contacts#delivery-contacts">Відділ доставки</a>
                    <a href="/contacts#ordering-contacts">Замовлення продукції</a>
                    <a href="/contacts#accounting-contacts">Бухгалтерія</a>
                </div> */}
            </div>
        </nav>
        <a href="/cart" >
        <button  className="btn">
            <FaShoppingCart /> Замовити
        </button>
                </a>
    </header>
    
  );
}