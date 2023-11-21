import Icon, {AppIcons} from "../../../../widgets/icon";
import {FC} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import {publicUrl} from "../../../../utils/common.ts";

type ProductCardProps = {
    product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const {
        title,
        price,
        image_url,
    } = product
    return (
        <div className="product-card-container">
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
