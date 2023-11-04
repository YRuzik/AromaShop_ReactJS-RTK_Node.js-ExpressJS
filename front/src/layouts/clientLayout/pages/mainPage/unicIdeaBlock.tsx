import ElevatedButton from "../../../../widgets/elevatedButton";

const UnicIdeaBlock = () => {
  return (
    <div
      className="unic-idea-block-bg"
      style={{
        width: "100%",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div className="body-container flexbox-sb-c w-100">
        <div className="w-100 h-100 pt-10">
          <div className="w-50 pb-10 pt-5">
            <h2 className="pb-1">
              У вас своя уникальная идея по разработке свечки?
            </h2>
            Изготовим свечку по вашему дизайну. Расскажем лайфхаки и ознакомим с
            технологией производства, предоставим образцы матералов.
          </div>
          <div>
            <h2 className="pb-1">
              Введите свои контактные данные, и наш менеджер свяжется с Вами в
              течении 1 часа
            </h2>
            <div className="flexbox-sb-c">
              <input className="classic-input" placeholder="Ваше Имя" />
              <input
                className="classic-input"
                placeholder="Ваша электронная почта"
              />
              <input
                className="classic-input"
                placeholder="Ваш номер телефона"
              />
              <div className={"w-25"}>
                <ElevatedButton label="Заказать" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnicIdeaBlock;
