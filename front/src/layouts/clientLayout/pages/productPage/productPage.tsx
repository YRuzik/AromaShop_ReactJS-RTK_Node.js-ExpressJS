import {useParams} from "react-router-dom";
import {useFetchSingleProductQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import PreviewBlock from "../../widgets/previewBlock.tsx";
import {useEffect, useState} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import UnicIdeaBlock from "../mainPage/unicIdeaBlock.tsx";
import ElevatedButton, {ButtonStyles} from "../../../../widgets/elevatedButton.tsx";
import {addToCart} from "../../widgets/modalCart.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentCart} from "../../../../utils/redux/features/common/commonSlice.ts";

const ProductPage = () => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState<IProduct | null>(null)
    const {id} = useParams()
    const cart = useSelector(selectCurrentCart)
    const {data: pr} = useFetchSingleProductQuery(id ?? "")
    const [added, setAdded] = useState(false)

    useEffect(() => {
        if ((pr !== undefined) && (id !== undefined) && (id !== "")) {
            setProduct(pr)
            window.scrollTo(0, 0)
        }
    }, [pr]);

    useEffect(() => {
        if (pr !== undefined) {
            if (cart.filter((obj) => obj.product_id === pr.product_id).length > 0) {
                setAdded(true)
            }
        }
    }, [cart, pr]);

    return (
        <>
            {product !== null ? <>
                <PreviewBlock route={product.title} title={product.title}
                              subtitle={`Осталось - ${product.quantity} штук! Успей приобрести данный товар, пока он не закончился.`}
                              server_photo={product.image_url}/>
                <div className={"flexbox-column pos-r body-container mt-10"}>
                    <div className={"mb-5"}>
                        <hr style={{margin: "30px 0 20px 0"}}/>
                        <div className={"flexbox-sb-c"}>
                            <div className={"flexbox-line al-i-e"}>
                                <div style={{height: 30}}>Цена:</div>
                                <h1 style={{paddingLeft: "10px"}}>{product.price} руб.</h1>
                            </div>
                            <div className={"w-25"}>
                                <ElevatedButton
                                    style={added ? ButtonStyles.white : ButtonStyles.green}
                                    onClick={added ? () => {
                                    } : () => {
                                        addToCart(product, dispatch)
                                        setAdded(true)
                                    }}
                                    label={added ? "✓ добавлено" : "В корзину"}/>
                            </div>
                        </div>
                        <hr style={{margin: "30px 0 20px 0"}}/>
                    </div>
                    <div className={"flexbox-column w-100"}>
                        <h1>Страна производства</h1>
                        <h2>{product.country}</h2>
                        <hr style={{margin: "30px 0 20px 0"}}/>
                        <h1>Категория</h1>
                        <h2>{product.category}</h2>
                        <hr style={{margin: "30px 0 20px 0"}}/>
                        <h1>Тип свечки</h1>
                        <h2>{product.type_name}</h2>
                        <hr style={{margin: "30px 0 20px 0"}}/>
                        <h1>Год производства</h1>
                        <h2>{new Date(product.creation_date).getFullYear()} год</h2>
                        <hr style={{margin: "30px 0 20px 0"}}/>
                    </div>
                </div>
            </> : <div style={{height: "3000px"}}></div>}
            <UnicIdeaBlock/>
        </>
    )
}

export default ProductPage