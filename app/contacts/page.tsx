import { FaXTwitter , FaPhoneVolume } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineContactMail } from "react-icons/md";
import "./style.css";

// (Необов'язково) Ви можете визначити метадані для цієї конкретної сторінки.
// Вони будуть об'єднані з глобальними метаданими з layout.tsx
export const metadata = {
  title: 'Моя Нова Сторінка',
  description: 'Це опис моєї порожньої сторінки в Next.js.',
};

export default function contacts() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Контакти</h1>
      <section id="delivery-contacts" className="contact-section">
          <h2 className="section-title">Відділ доставки</h2>
          <div className="contact-card">
              <h3 className="contact-name"><IoMdPerson /> Ім'я відповідального за доставку</h3>
              <p className="contact-info">
                  <span className="info-label"><FaPhoneVolume /> Мобільний телефон:</span> <a href="tel:+380XXXXXXXXX">+380 (XX) XXX-XX-XX</a>
              </p>
              <p className="contact-info">
                  <span className="info-label"><FaXTwitter /> Twitter:</span> <a href="https://twitter.com/YourDeliveryHandle" target="_blank">@YourDeliveryHandle</a>
              </p>
              <p className="contact-info">
                  <span className="info-label"><FaTelegram /> Telegram:</span> <a href="https://t.me/YourDeliveryTelegram" target="_blank">@YourDeliveryTelegram</a>
              </p>
              <p className="contact-description">Зв'яжіться з нами для питань щодо статусу замовлень, термінів доставки та логістичних деталей.</p>
          </div>
      </section>
      <section id="ordering-contacts" className="contact-section">
          <h2 className="section-title">Замовлення продукції</h2>
          <div className="contact-card">
              <h3 className="contact-name"><IoMdPerson /> Ім'я менеджера з замовлень</h3>
              <p className="contact-info">
                  <span className="info-label"><FaPhoneVolume /> Мобільний телефон:</span> <a href="tel:+380XXXXXXXXX">+380 (XX) XXX-XX-XX</a>
              </p>
              <p className="contact-info">
                  <span className="info-label"><FaXTwitter /> Twitter:</span> <a href="https://twitter.com/YourOrderHandle" target="_blank">@YourOrderHandle</a>
              </p>
              <p className="contact-info">
                  <span className="info-label"><FaTelegram /> Telegram:</span> <a href="https://t.me/YourOrderTelegram" target="_blank">@YourOrderTelegram</a>
              </p>
              <p className="contact-description">Для оформлення нових замовлень, уточнення асортименту та цін звертайтеся до цього відділу.</p>
          </div>
      </section>
      <section id="accounting-contacts" className="contact-section">
          <h2 className="section-title">Бухгалтерія</h2>
          <div className="contact-card">
              <h3 className="contact-name"><IoMdPerson /> Ім'я головного бухгалтера</h3>
              <p className="contact-info">
                  <span className="info-label"><FaPhoneVolume /> Мобільний телефон:</span> <a href="tel:+380XXXXXXXXX">+380 (XX) XXX-XX-XX</a>
              </p>
              <p className="contact-info">
                  <span className="info-label"><FaXTwitter /> Twitter:</span> <a href="https://twitter.com/YourAccountingHandle" target="_blank">@YourAccountingHandle</a>
              </p>
              <p className="contact-info">
                  <span className="info-label"><FaTelegram /> Telegram:</span> <a href="https://t.me/YourAccountingTelegram" target="_blank">@YourAccountingTelegram</a>
              </p>
              <p className="contact-description">З усіх фінансових питань, рахунків та звітності, будь ласка, звертайтесь до бухгалтерії.</p>
          </div>
      </section>
      <section className="contacts">
        <h2> <MdOutlineContactMail /> Контакти</h2>
        <form>
            <input type="text" placeholder="Ваше ім'я"/>
            <input type="email" placeholder="Ваш email"/>
            <textarea placeholder="Ваше повідомлення"></textarea>
            <button>Надіслати</button>
        </form>
    </section>
    </div>
  );
}