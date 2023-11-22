import {useFetchOrdersQuery} from "../../../../utils/redux/features/users/usersApiSlice.ts";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../../utils/redux/features/auth/authSlice.ts";
import {FC, useEffect, useState} from "react";
import {IOrder} from "../../../../utils/interfaces/iuser.ts";
import {ICartEntity} from "../../../../utils/interfaces/icommon.ts";
import {publicUrl} from "../../../../utils/common.ts";

const ProfileOrders = () => {
    const user = useSelector(selectCurrentUser)
    const [orders, setOrders] = useState<IOrder[]>([])
    const {data: ords} = useFetchOrdersQuery(user?.id ?? "")

    useEffect(() => {
        if ((ords !== null) && (ords !== undefined) && (ords.length > 0)) {
            setOrders(ords)
        }
    }, [ords]);

    return (
        <div className={"profile-block-container"}>
            <h1 style={{marginBottom: "25px"}}>Заказы</h1>
            {orders.map((order, index) => <OrderEntity {...order} key={index}/>)}
        </div>
    )
}

const OrderEntity: FC<IOrder> = (props) => {
    const {order_json, order_name, order_status, stamp} = props
    const [details, setDetails] = useState<ICartEntity[]>([])

    useEffect(() => {
        setDetails(order_json)
    }, []);

    return (
        <div style={{marginBottom: "100px"}}>
            <div className={"flexbox-sb-c"}>
                <div>
                    <h2 className={"mb-1"}>{order_name}</h2>
                    <span>Дата </span>{new Date(stamp).toLocaleDateString()}
                </div>
                <div>
                    Статус: {order_status}
                </div>
            </div>
            <hr style={{margin: "20px 0 20px 0"}}/>
            <h2 className={"mb-1"}>Детали заказа:</h2>
            {details.map((product, index) => <div key={index} className={"flexbox-sb-c mb-1"}>
                <img src={`${publicUrl}${product.image_url}`} alt={product.title} style={{width: "10%", borderRadius: "10px"}}/>
                <div className={"w-25"}>
                    {product.title}
                </div>
                <div className={"w-25 flexbox-line jc-e"}>
                    {product.selected_quantity * product.price} руб.
                </div>
                <div className={"w-25 flexbox-line jc-e"}>
                    {product.selected_quantity} шт.
                </div>
            </div>)}
        </div>
    )
}

export default ProfileOrders