import { Link } from "react-router-dom";
import TabsPanel from "./tabsPanel";
import { Labels } from "../../../../labels";

const LastProducts = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: "-300px",
        position: 'relative'
      }}
      className="last-products-bg"
    >
      <div className="body-container" style={{paddingBottom: 75}}>
        <div className="flexbox-sb-c pb-1" style={{ position: "relative" }}>
          <div>
            <h1>{Labels.mostPopular}</h1>
            {Labels.mostPopularDesc.toLowerCase()}
          </div>
          <div>
            <Link to={""}>{Labels.catalog}</Link>
          </div>
        </div>
        <TabsPanel />
      </div>
    </div>
  );
};

export default LastProducts;
