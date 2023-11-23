import { Link } from "react-router-dom";
import { Labels } from "../../../labels";

const Menu = () => {
  return (
    <div className="menu">
      <div className="body-container">
        <div className="flexbox-sb-c">
          <div className="flexbox-sb-c w-50">
            <Link to={"/"} className="link-style">
              <h3>{"Главная"}</h3>
            </Link>
            <div className="menu-slot">
              <Link to={"/catalog"} className="link-style-white">
                <h3>{Labels.catalog}</h3>
              </Link>
              <div className="menu-slot-particle"></div>
            </div>
            <Link to={"/contacts"} className="link-style">
              <h3>{Labels.contacts}</h3>
            </Link>
          </div>
          <div className="w-100" style={{ textAlign: "end", color: 'var(--main-purple)'}}>
            <h1>{Labels.candleSale.toUpperCase()}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
