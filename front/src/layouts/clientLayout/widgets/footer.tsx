const Footer = () => {
  return (
    <div className="footer-bg mt-5" >
      <div className="body-container flexbox-line">
        <div className="w-25">
          <div className="pb-10">
            <h1>AROMA SHOP</h1>
            Свежее дыхание в вашей жизни, доме, офисе или предприятии
          </div>
          <div>
            <h2>+380 630 130 103</h2>
            example@gmail.com
          </div>
        </div>
        <div className="flexbox-column w-25">
            <h2>
                Категории
            </h2>
            
        </div>
        <div className="flexbox-column w-25">
            <h2>
                Информация
            </h2>
            
        </div>
        <div className="flexbox-column w-25">
            <h2 className="pb-1">
                Связаться с менеджером
            </h2>
            Есть вопрос на который не нашли ответ? Оставьте контакт и наш менеджер свяжеться с вами
        </div>
      </div>
    </div>
  );
};

export default Footer;
