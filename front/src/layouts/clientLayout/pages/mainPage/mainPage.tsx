import LastProducts from "./lastProducts";
import MainBlock from "./mainBlock";
import "./mainPage.css";
import Slider from "../../widgets/slider";
import SetsBlock from "./setsBlock";
import UnicIdeaBlock from "./unicIdeaBlock";
import OrderBlock from "./orderBlock";

const MainPage = () => {
  return (
    <>
      <MainBlock />
      <LastProducts />
      <SetsBlock/>
      <OrderBlock/>
      <UnicIdeaBlock/>
      <div className="body-container">
        <h1>С нами сотрудничают</h1>
        <Slider />
      </div>
    </>
  );
};

export default MainPage;
