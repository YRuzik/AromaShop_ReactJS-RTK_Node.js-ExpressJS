import PreviewBlock from "../../widgets/previewBlock";
import preview from "../../../../assets/img/previews/contacts.png";
import map from "../../../../assets/img/map.png"
import {Labels} from "../../../../labels.tsx";

const AboutUsPage = () => {
  return (
    <>
      <PreviewBlock
        title="Кто такие aroma shop"
        subtitle="Aroma - это команда гуру творчества, со своей экспертностью в свечевом сегменте. Мы знаем как волнителен, чаще стрессовый бывает заказ брендированной продукции и корпоративных подарков, потому, что были по обе стороны заказа. Это нам позволило изучить проблематики бизнесов и представить лучшие и современые решения для наших клиентов"
        route={Labels.contacts}
        photo={preview}
      />
      <div className="body-container pos-r" style={{paddingTop: '150px'}}>
        <div style={{paddingBottom: '50px'}}>
          <h2 className="pb-1">Свежее дыхание в корпоративной жизни</h2>
          Итак, сайт Aroma Shop, который вы видите перед собой, является кульминацией
          «идеального шторма» многолетнего поиска, оттачивания, создания и
          объединения наших навыков и опыта. А теперь - вот оно! Мы очень рады
          поделиться с вами нашим ассортиментом, нашими идеями и нашей страстью.
        </div>
        <div style={{paddingBottom: '50px'}}>
          <h2 className="pb-1">Снимаем головную боль</h2>
          Наша цель состоит в том, чтобы избавить Вас от лишнего. Выбор и заказ 
          продукции должен проходить приятно, а все сложности и
          специфики производства останутся за кулисами. Будьте максимально
          продуктивны в своем деле и не расстачивайте свою эненргию на поиски,
          задачи и контроль подрядчиков.
        </div>
        <div>
          <h2 className="pb-1">Контактная информация</h2>
          Наше расположение на карте
          <div className={"mt-1"}>
            <img alt={"map"} src={map} style={{borderRadius: "15px", width: "100%", objectFit: "cover", boxShadow: "5px 5px 20px 5px rgba(0,0,0,.1)"}}/>
          </div>
        </div>
        <div className={"flexbox-column mt-1"}>
          <div>
            <h3 style={{paddingBottom: "5px"}}>Физический адрес</h3>
            ул. Батурина, Владимир, Владимирская обл., 600017
            <h3 style={{paddingBottom: "5px", paddingTop: "15px"}}>Электронная почта</h3>
            aromashop@mail.ru
            <h3 style={{paddingBottom: "5px", paddingTop: "15px"}}>Телефон</h3>
            +7 (903) 534-23-45
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
