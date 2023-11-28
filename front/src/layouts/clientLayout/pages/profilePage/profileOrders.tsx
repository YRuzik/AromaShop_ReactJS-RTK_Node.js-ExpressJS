import {useDeclineOrderMutation, useFetchOrdersQuery} from "../../../../utils/redux/features/users/usersApiSlice.ts";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../../utils/redux/features/auth/authSlice.ts";
import {FC, useEffect, useState} from "react";
import {IOrder} from "../../../../utils/interfaces/iuser.ts";
import {ICartEntity} from "../../../../utils/interfaces/icommon.ts";
import {publicUrl} from "../../../../utils/common.ts";
import ElevatedButton, {ButtonStyles} from "../../../../widgets/elevatedButton.tsx";

const ProfileOrders = () => {
    const user = useSelector(selectCurrentUser)
    const [orders, setOrders] = useState<IOrder[]>([])
    const {data: ords} = useFetchOrdersQuery(user?.id ?? "")

    useEffect(() => {
        if ((ords !== null) && (ords !== undefined) && (ords.length > 0)) {
            setOrders(ords.slice().reverse())
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
    const {order_json, order_name, order_status, stamp, order_id} = props
    const [details, setDetails] = useState<ICartEntity[]>([])
    const [expanded, setExpanded] = useState(false)
    const [declineOrder] = useDeclineOrderMutation()
    const [declined, setDeclined] = useState(false)

    useEffect(() => {
        setDetails(order_json)
        if (order_status === "Отменен") {
            setDeclined(true)
        }
    }, []);

    return (
        <div style={{marginBottom: "50px"}} className={"order-inner-container"}>
            <div className={"flexbox-sb-c"}>
                <div>
                    <h2 className={"mb-1"}>{order_name}</h2>
                    <span>Дата </span>{new Date(stamp).toLocaleDateString()}
                </div>
                <div>
                    {(order_status !== "Готов к выдаче") && (order_status !== "Отменен администратором") && !declined ? <ElevatedButton style={ButtonStyles.black} onClick={async () => {
                        try {
                            await declineOrder(order_id)
                            setDeclined(true)
                        } catch (e) {
                            console.log(e)
                        }
                    }} label={"Отменить"}/> : null}
                    <div className={"flexbox-line al-i-c"}>
                        Статус: <h3 style={{paddingLeft: "5px"}}>{declined ? "Отменен" : order_status}</h3>
                    </div>
                </div>
            </div>
            <hr style={{margin: "20px 0 20px 0", borderColor: "white"}}/>
            <div className={"mb-1"}>Детали заказа <span className={"clickable-text"} onClick={() => {
                setExpanded(!expanded)
            }}>{expanded ? "скрыть" : "показать"}</span></div>
            <div className={"common-transition overflow-hidden"} style={expanded ? {height: "auto"} : {height: "0px"}}>
                {details.map((product, index) => <div key={index} className={"flexbox-sb-c mb-1"}>
                    <img src={`${publicUrl}${product.image_url}`} alt={product.title}
                         style={{width: "10%", height: "100px", borderRadius: "10px"}}/>
                    <div className={"w-25"}>
                        <h3>{product.title}</h3>
                    </div>
                    <div className={"w-25 flexbox-line jc-e"}>
                        {product.selected_quantity * product.price} руб.
                    </div>
                    <div className={"w-25 flexbox-line jc-e"}>
                        {product.selected_quantity} шт.
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default ProfileOrders