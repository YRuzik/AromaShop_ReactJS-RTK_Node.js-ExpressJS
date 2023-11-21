import Icon, {AppIcons} from "../../../../widgets/icon";
import {FC} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import {publicUrl} from "../../../../utils/common.ts";
import {useNavigate} from "react-router-dom";

type ProductCardProps = {
    product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const navigate = useNavigate()
    const {
        title,
        price,
        image_url,
        product_id
    } = product
    return (
        <div onClick={() => navigate(`/catalog/${product_id}`)} className="product-card-container">
            <div className="product-card-img">
                <img src={`${publicUrl}${image_url}`} className={"product-card-img"} alt={title}/>
            </div>
            <div className="p-5 flexbox-column-sb" style={{height: 260}}>
                <div>
                    <h2>{title}</h2>
                </div>
                <div className="flexbox-sb-c">
                    <div>
                        <h2 >
                            {price} руб.
                        </h2>
                    </div>
                    <Icon icon={AppIcons.cart}/>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
