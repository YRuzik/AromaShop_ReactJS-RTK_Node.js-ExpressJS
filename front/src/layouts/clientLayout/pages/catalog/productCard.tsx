import image from "../../../../assets/img/mock2.jpg";
import Icon, { AppIcons } from "../../../../widgets/icon";

const ProductCard = () => {
  return (
    <div className="product-card-container">
      <div className="product-card-img">
      <img src={image} />
      </div>
      <div className="p-5 flexbox-column-sb" style={{height: 260}}>
        <div>
          <h2>sdfsdfsf</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          officia!
        </div>
        <div className="flexbox-sb-c">
            <div>
                <h2 color="gray">
                    $76.34
                </h2>
            </div>
            <Icon icon={AppIcons.cart}/>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
