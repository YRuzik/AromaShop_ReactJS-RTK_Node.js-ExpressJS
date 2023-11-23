import ElevatedButton, {
  ButtonStyles,
} from "../../../../widgets/elevatedButton";
import {useNavigate} from "react-router-dom";

const SetsBlock = () => {
  const navigate = useNavigate()
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
            Выбирайте готовые сверчки или укажите критерии по которым
            мы изготовим для вас уникальную свечку.
            <div className="flexbox-line" style={{ paddingTop: "3%" }}>
              <div className={"w-50"}>
                <ElevatedButton
                    label="Перейти к товарам"
                    onClick={() => {
                      navigate("/catalog")
                    }}
                    style={ButtonStyles.black}
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
