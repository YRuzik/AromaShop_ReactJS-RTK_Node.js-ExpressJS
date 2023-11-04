import "./catalogPage.css";
import PreviewBlock from "../../widgets/previewBlock";
import Goods from "./goods";
import preview from "../../../../assets/img/previews/goods.png"

const CatalogPage = () => {
  return (
    <>
      <PreviewBlock
        title="ПОДБЕРИТЕ ИНДИВИДУАЛЬНУЮ СВЕЧКУ"
        subtitle="Любое свидание или встреча с близким человеком не обойдется без данного реквизина. Так же это прекрасный подарок для ваших сотрудников, деловых партнеров, друзей или постоянных клиентов. Вы можете распространять эти изделия во время рекламных мероприятий, презентаций, выставок или конференций."
        route="Все товары"
        photo={preview}
      />
      <Goods />
    </>
  );
};

export default CatalogPage;
