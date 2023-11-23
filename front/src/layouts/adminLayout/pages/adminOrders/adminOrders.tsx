import {FC} from "react";
import {IAdminOrder} from "../../../../utils/interfaces/iuser.ts";
import {useFetchAllOrdersQuery} from "../../../../utils/redux/features/admin/adminApiSlice.ts";

const AdminOrders = () => {
    const {data: orders} = useFetchAllOrdersQuery()
    return (
        <div className={"flexbox-column"}>
            <div className={"flexbox-sb-c"}>
                <div className={"w-25"}>
                    <h3>Дата/Время</h3>
                </div>
                <div className={"w-25"}>
                    <h3>ФИО</h3>
                </div>
                <div className={"w-25"}>
                    <h3>Кол-во товаров</h3>
                </div>
                <div className={"w-25"}>
                    <h3>Статус</h3>
                </div>
            </div>
            <hr style={{margin: "10px 0 0px 0"}}/>
            {(orders !== undefined) ? orders.map((order, index) => <AdminOrderEntity key={index} {...order} />) : null}
        </div>
    )
}

const AdminOrderEntity: FC<IAdminOrder> = (order) => {
    const {order_status, order_json, stamp, name, surname, patronymic} = order
    return (
        <div className={"flexbox-sb-c admin-order-entity"}>
            <div className={"w-25"}>
                {new Date(stamp).toLocaleDateString()} {new Date(stamp).toLocaleTimeString()}
            </div>
            <div className={"w-25"}>
                {surname} {name} {patronymic}
            </div>
            <div className={"w-25"}>
                {order_json.length}
            </div>
            <div className={"w-25"}>
                {order_status}
            </div>
        </div>
    )
}

export default AdminOrders