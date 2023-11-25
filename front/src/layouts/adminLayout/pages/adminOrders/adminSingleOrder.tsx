import {useFetchSingleOrderQuery} from "../../../../utils/redux/features/admin/adminApiSlice.ts";
import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {publicUrl} from "../../../../utils/common.ts";
import Icon, {AppIcons} from "../../../../widgets/icon.tsx";

const AdminSingleOrder: FC = () => {
    const {id} = useParams()
    const {data: order} = useFetchSingleOrderQuery(id ?? "")
    const [sum, setSum] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (order !== undefined) {
            let tmpSum = 0;
            order.order_json.forEach((product) => {
                tmpSum += (product.selected_quantity * product.price)
            })
            setSum(tmpSum)
        }
    }, [order]);

    return (
        <div>
            {(order !== undefined) ? <div className={"flexbox-column"}>
                <div>
                    <div className={"flexbox-sb-s"}>
                        <h1>Заказ - {order.order_name}</h1>
                        <Icon icon={AppIcons.close} onClick={() => {
                            navigate(-1)
                        }}/>
                    </div>
                    <div className={"flexbox-line al-i-c"}>
                        <span style={{paddingRight: "5px"}}>Дата создания - </span><h3>{new Date(order.stamp).toLocaleDateString()} {new Date(order.stamp).toLocaleTimeString()}</h3>
                    </div>
                    <div className={"flexbox-line al-i-c"}>
                        <span style={{paddingRight: "5px"}}>Статус - </span><h3>{order.order_status}</h3>
                    </div>
                </div>
                <hr style={{margin: "20px 0 20px 0"}}/>
                <div>
                    <h2>Заказчик - {order.surname} {order.name} {order.patronymic}</h2>
                    <div className={"flexbox-line al-i-c"}>
                        <span style={{paddingRight: "5px"}}>Эл. почта -</span><h3>{order.email}</h3>
                    </div>
                    <div className={"flexbox-line al-i-c"}>
                        <span style={{paddingRight: "5px"}}>Общая сумма заказа - </span><h3>{sum} руб.</h3>
                    </div>
                </div>
                <hr style={{margin: "20px 0 20px 0"}}/>
                <div>
                    <div style={{paddingBottom: "20px"}}>Детали заказа</div>
                    <div className={"flexbox-column"}>
                        <div className={"flexbox-sb-c mb-1"}>
                            <div className={"w-10"}>
                                <h3>Фото</h3>
                            </div>
                            <div className={"w-25"}>
                                <h3>Наименование</h3>
                            </div>
                            <div className={"w-25 flexbox-line jc-e"}>
                                <h3>Цена</h3>
                            </div>
                            <div className={"w-25 flexbox-line jc-e"}>
                                <h3>Количество</h3>
                            </div>
                        </div>
                        {order.order_json.map((product, index) => <div key={index} className={"flexbox-sb-c mb-1"}>
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
            </div> : null}
        </div>
    )
}

export default AdminSingleOrder