import {FC, useEffect, useState} from "react";
import ModalDialog from "../../../widgets/modalDialog.tsx";
import ElevatedButton from "../../../widgets/elevatedButton.tsx";
import {ICartEntity, IProduct} from "../../../utils/interfaces/icommon.ts";
import Icon, {AppIcons} from "../../../widgets/icon.tsx";
import {publicUrl} from "../../../utils/common.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentToken, selectCurrentUser} from "../../../utils/redux/features/auth/authSlice.ts";
import {
    useCreateOrderMutation,
    useValidatePasswordMutation
} from "../../../utils/redux/features/users/usersApiSlice.ts";
import {selectCurrentCart, setCart} from "../../../utils/redux/features/common/commonSlice.ts";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";

export const addToCart = (product: IProduct, dispatch: Dispatch<AnyAction>) => {
    const existsCart: ICartEntity[] = JSON.parse(localStorage.getItem("aroma-cart")!)
    if (existsCart.some(e => e.product_id === product.product_id)) {
        existsCart.map((obj) => {
            if (obj.product_id === product.product_id) {
                obj.selected_quantity += 1;
            }
        })
        localStorage.setItem("aroma-cart", JSON.stringify([...existsCart]))
        dispatch(setCart([...existsCart]))
    } else {
        localStorage.setItem("aroma-cart", JSON.stringify([...existsCart, {...product, selected_quantity: 1}]))
        dispatch(setCart([...existsCart, {...product, selected_quantity: 1}]))
    }
    return existsCart
}

export const removeFromCart = (product: ICartEntity, force: boolean, dispatch: Dispatch<AnyAction>) => {
    const existsCart: ICartEntity[] = JSON.parse(localStorage.getItem("aroma-cart")!)
    let a = []
    if (force) {
        a = existsCart.filter(obj => obj.product_id !== product.product_id)
    } else {
        if (product.selected_quantity === 1) {
            a = existsCart.filter(obj => obj.product_id !== product.product_id)
        } else {
            existsCart.map((obj) => {
                if (obj.product_id === product.product_id) {
                    obj.selected_quantity = obj.selected_quantity - 1;
                }
            })
            a = existsCart
        }
    }
    localStorage.setItem("aroma-cart", JSON.stringify([...a]))
    dispatch(setCart([...a]))
    return a
}

type modalCartProps = {
    isOpen: boolean,
    onClose(): void
}
const ModalCart: FC<modalCartProps> = ({isOpen, onClose}) => {
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)
    const cart = useSelector(selectCurrentCart)
    const [sum, setSum] = useState(0)
    const [validatePassword] = useValidatePasswordMutation()
    const [createOrder] = useCreateOrderMutation()
    const user = useSelector(selectCurrentUser)
    const [password, setInputPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        let tmpSum = 0;
        cart.forEach((product) => {
            tmpSum += (product.selected_quantity * product.price)
        })
        setSum(tmpSum)
    }, [cart])

    useEffect(() => {
        return () => {
            setError("")
        }
    }, []);

    return (
        <ModalDialog onClose={() => onClose()} isOpen={isOpen} content={
            <div className={"flexbox-line al-i-s"} style={{height: 400}}>
                <div className={"flexbox-column w-25"} style={{justifyContent: "space-between"}}>
                    <div className={"mb-10"}>
                        <h2 className={"mb-1"}>Оформить заказ</h2>
                        Введите пароль для подтверждения заказа
                    </div>
                    <input className={"classic-input mb-10"} placeholder={"Пароль"} type={"password"}
                           onChange={(v) => setInputPassword(v.currentTarget.value)}/>
                    <div>
                        {error ?? <div className={"error-message"}>{error}</div>}
                        <ElevatedButton onClick={async () => {
                            if (user !== null) {
                                try {
                                    await validatePassword({user_id: user.id!, password: password})
                                    const cart = localStorage.getItem("aroma-cart");
                                    if (cart !== null) {
                                        await createOrder({order_json: cart, user_id: user.id!})
                                    }
                                    localStorage.setItem("aroma-cart", "[]")
                                    dispatch(setCart([]))
                                } catch (e: any) {
                                    setError(e.data.message)
                                }
                            }
                        }} label={(token === null) ? "Для оформления заказа авторизуйтесь" : "Заказать"}
                                        disabled={(cart.length === 0) || (token === null)}/>
                    </div>
                </div>
                <div style={{borderRight: "2px solid black", height: "100%", margin: "0 20px 0 20px"}}>

                </div>
                <div className={"w-75 flexbox-column pos-r"} style={{justifyContent: 'space-between'}}>
                    <h2>Корзина</h2>
                    <div style={{maxHeight: "300px", overflowY: 'auto'}}>
                        {cart.map((cartEntity, index) => <div key={index}>
                            <div className={"flexbox-sb-c"}>
                                <div className={"flexbox-line al-i-c w-25"}>
                                    <img className={"cart-entity-img"} alt={cartEntity.title}
                                         src={`${publicUrl}${cartEntity.image_url}`}/>
                                    <h2 className={"pl-5"}>{cartEntity.title}</h2>
                                </div>
                                <div className={"flexbox-column al-i-c w-25"}>
                                    <div>
                                        <span>Тип</span>
                                    </div>
                                    <div>
                                        {cartEntity.type_name}
                                    </div>
                                </div>
                                <div className={"flexbox-column al-i-c w-25"}>
                                    <div>
                                        <span>Кол-во</span>
                                    </div>
                                    <div className={"flexbox-line"}>
                                        <div onClick={() => {
                                            if (cartEntity.selected_quantity === 1) {
                                                removeFromCart(cartEntity, true, dispatch)
                                            } else {
                                                removeFromCart(cartEntity, false, dispatch)
                                            }
                                        }} className={"cart-entity-button"}>
                                            -
                                        </div>
                                        <div>
                                            {cartEntity.selected_quantity}
                                        </div>
                                        {cartEntity.quantity > cartEntity.selected_quantity ? <div onClick={() => {
                                            addToCart(cartEntity, dispatch)
                                        }} className={"cart-entity-button"}>
                                            +
                                        </div> : null}
                                    </div>
                                </div>
                                <div className={"flexbox-line al-i-c w-25 jc-e"}>
                                    <h2>{cartEntity.selected_quantity * cartEntity.price} руб.</h2>
                                    <Icon icon={AppIcons.close} onClick={() => {
                                        removeFromCart(cartEntity, true, dispatch)
                                    }}/>
                                </div>

                            </div>
                            <hr style={{margin: "20px 0 20px 0"}}/>
                        </div>)}
                    </div>
                    <div className={"w-100 flexbox-line jc-e"}>
                        <h2>Всего: {sum} руб.</h2>
                    </div>
                </div>
            </div>
        }/>
    )
}

export default ModalCart