import Image from "next/image";
import { FaBoxes } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { MdVerifiedUser  } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";

export default function Home() {
  return (
    <div >

    <section className="hero-banner">
    <div className="banner-content">
        <h1>Ваш надійний постачальник якісних продуктів</h1>
        <p>Ми забезпечуємо безперебійну доставку найсвіжіших продуктів прямо до вашого бізнесу, гарантуючи якість та широкий асортимент.</p>
        <div className="banner-actions">
            <a href="/products" className="btn-primary-banner">Переглянути каталог</a>
            <a href="/about" className="btn-secondary-banner">Дізнатися більше про нас</a>
        </div>
    </div>
</section>
    <section className="advantages">
        <div className="advantage">
          <FaBoxes />
          <h3>  Широкий асортимент</h3>
          <p>Понад 1000 пропозицій продуктів харчування</p>
        </div>
        <div className="advantage">
          <FaTruckFast />
          <h3>Швидка доставка</h3>
          <p>Гарантія доставки протягом 24 годин</p>
        </div>
        <div className="advantage">
          <MdVerifiedUser />
          <h3>Сертифікована якість</h3>
          <p>Продукти відповідають стандартам НАССР</p>
        </div>
    </section>
    {/* <section className="products">
        <h2>Наші продукти</h2>
        <div className="product_drid">
             <div className="product_card">
                   <h3>Сири</h3>
                   <Image 
                    src="/images/chees.jpg" 
                    alt="Сири"
                    width={300}
                    height={300}/>
                   <p className="price">Від 350 грн.кг</p>
                    <p>стан наявності!!!</p>
                  <button> 
                    <BsCartPlus />
                    Додати до кошика
                  </button>
             </div>
                <div className="product_card">
                    <h3>Ковбаса</h3>
                    <Image 
                      src="/images/sausage.jpeg" 
                      alt="Ковбаса"
                      width={300}
                      height={300}/>
                    <p className="price">Від 180 грн.кг</p>
                    <p>стан наявності!!!</p>
                  <button> 
                    <BsCartPlus />
                    Додати до кошика
                  </button>
                </div>
                <div className="product_card">
                    <h3>Крупи</h3>
                    <Image 
                      src="/images/krupu_yashuku.jpg" 
                      alt="Крупи"
                      width={300}
                      height={300}/>
                    <p className="price">Від 20 грн.кг</p>
                    <p>стан наявності!!!</p>
                  <button> 
                    <BsCartPlus />
                    Додати до кошика
                  </button>
                </div>
        </div>
    </section> */}
    {/* --- Секція "Наші партнери" --- */}
      <section id="our-partners" className="partners-section">
        <h2 className="section-title">Нам довіряють провідні компанії</h2>
        <p className="partners-description">
          Ми пишаємося довгостроковими відносинами з нашими партнерами, які свідчать про нашу надійність та якість послуг.
        </p>
        <div className="partners-logos-grid">
          {/* УВАГА: Замініть на реальні логотипи ваших партнерів.
                     Якщо немає дозволу, використовуйте іконки-заглушки або загальні зображення.
                     Для Next.js Image використовуйте реальні шляхи до зображень у `public` папці. */}
          <div className="partner-logo-item">
            <Image src="/images/partner-logo-1.png" alt="Партнер 1" width={150} height={80} objectFit="contain" />
          </div>
          <div className="partner-logo-item">
            <Image src="/images/partner-logo-2.png" alt="Партнер 2" width={150} height={80} objectFit="contain" />
          </div>
          <div className="partner-logo-item">
            <Image src="/images/partner-logo-3.png" alt="Партнер 3" width={150} height={80} objectFit="contain" />
          </div>
          <div className="partner-logo-item">
            <Image src="/images/partner-logo-4.png" alt="Партнер 4" width={150} height={80} objectFit="contain" />
          </div>
          <div className="partner-logo-item">
            <Image src="/images/partner-logo-5.png" alt="Партнер 5" width={150} height={80} objectFit="contain" />
          </div>
          <div className="partner-logo-item">
            <Image src="/images/partner-logo-6.png" alt="Партнер 6" width={150} height={80} objectFit="contain" />
          </div>
          {/* Додайте більше логотипів за потреби */}
        </div>
      </section>

      {/* --- Секція "Зверніться до нас" (коротка версія) --- */}
      <section id="short-contact" className="short-contact-section">
        <h2 className="section-title">Маєте питання? Зв'яжіться з нами!</h2>
        <p className="contact-short-description">
          Наша команда завжди готова надати вам професійну консультацію та допомогти з вибором найкращих продуктів для вашого бізнесу.
        </p>
        <div className="contact-details-row">
            <div className="contact-detail-item">
                <span className="contact-icon">📞</span> {/* Можете замінити на React Icon */}
                <p>Телефон: <a href="tel:+380XXXXXXXXX">+380 (XX) XXX-XX-XX</a></p>
            </div>
            <div className="contact-detail-item">
                <span className="contact-icon">📧</span> {/* Можете замінити на React Icon */}
                <p>Email: <a href="mailto:info@promtrade.ua">info@promtrade.ua</a></p>
            </div>
        </div>
        <a href="/contacts" className="btn-primary">Перейти до контактів</a>
      </section>
    </div>
  );
}
