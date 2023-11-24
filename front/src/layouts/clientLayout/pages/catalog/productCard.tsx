import Icon, {AppIcons} from "../../../../widgets/icon";
import {FC, useEffect, useState} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import {publicUrl} from "../../../../utils/common.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentCart} from "../../../../utils/redux/features/common/commonSlice.ts";
import {addToCart} from "../../widgets/modalCart.tsx";

type ProductCardProps = {
    product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [added, setAdded] = useState(false)
    const cart = useSelector(selectCurrentCart)
    const {
        title,
        price,
        image_url,
        product_id
    } = product

    useEffect(() => {
        if (cart.filter((obj) => obj.product_id === product.product_id).length > 0) {
            setAdded(true)
        } else {
            setAdded(false)
        }
    }, [cart]);

    return (
        <div className={"product-card-container pos-r"}>
            <div onClick={() => navigate(`/catalog/${product_id}`)}>
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
                    </div>
                </div>
            </div>
            <div className={"product-card-button"}>
                {added ? <Icon icon={AppIcons.done}/> : <Icon icon={AppIcons.cart} onClick={() => {
                    addToCart(product, dispatch)
                }}/>}
            </div>
        </div>
    );
};

export default ProductCard;
