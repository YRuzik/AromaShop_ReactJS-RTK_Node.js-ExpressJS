import ElevatedButton, {
  ButtonStyles,
} from "../../../../widgets/elevatedButton";

const SetsBlock = () => {
  return (
    <div
      className="sets-block-bg"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div className="body-container candle-cards-bg">
        <div className="flexbox-sb-c pb-1" style={{ position: "relative" }}>
          <div className="w-75">
            <h1>Хотите удивить ваших коллег/партнеров необычными подарками?</h1>
            Выбирайте готовые подарочные наборы или укажите критерии по которым
            мы соберем для Вас уникальный бокс.
            <div className="flexbox-line" style={{ paddingTop: "3%" }}>
              <div className={"w-25"}>
                <ElevatedButton
                    label="Перейти к наборам"
                    onClick={() => {}}
                    style={ButtonStyles.black}
                />
              </div>
              <div style={{ width: 20 }}></div>
              <div className={"w-25"}>
                <ElevatedButton
                    label="Создать свой"
                    onClick={() => {}}
                    style={ButtonStyles.white}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetsBlock;
