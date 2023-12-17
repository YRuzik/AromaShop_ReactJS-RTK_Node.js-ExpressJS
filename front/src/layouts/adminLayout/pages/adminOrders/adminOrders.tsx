import {FC, useEffect, useState} from "react";
import {IAdminOrder} from "../../../../utils/interfaces/iuser.ts";
import {useChangeOrderMutation, useFetchAllOrdersQuery} from "../../../../utils/redux/features/admin/adminApiSlice.ts";
import SelectableText from "../../../../widgets/selectableText.tsx";
import Icon, {AppIcons} from "../../../../widgets/icon.tsx";
import {useNavigate} from "react-router-dom";

export enum OrderStatuses {
    processing = "В ожидании",
    declined = "Отменен",
    admin_declined = "Отменен администратором",
    ordering = "Собирается",
    done = "Готов к выдаче"
}

const AdminOrders = () => {
    const {data: orders, refetch} = useFetchAllOrdersQuery()
    const [changeOrder] = useChangeOrderMutation()
    const [sortedOrders, setSortedOrders] = useState<IAdminOrder[]>([])
    const [filter, setFilter] = useState<string | null>(null)
    const tableLabels = ["Дата и время", "ФИО", "Количество товаров", "Просмотрено"]

    useEffect(() => {
        setFilter(tableLabels[0])
    }, []);

    useEffect(() => {
        if ((orders !== undefined)) {
            let tmpArray = orders.slice()

            switch (filter) {
                case tableLabels[0]:
                    tmpArray = tmpArray.sort((a, b) => {
                        return (Date.parse(b.stamp)) - (Date.parse(a.stamp))
                    })
                    break;
                case tableLabels[1]:
                    tmpArray = tmpArray.sort((a, b) => {
                        if (a.surname.toLowerCase() < b.surname.toLowerCase()) {
                            return -1;
                        }
                        if (a.surname.toLowerCase() > b.surname.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    })
                    break;
                case tableLabels[2]:
                    tmpArray = tmpArray.sort((a, b) => {
                        return b.order_json.length - a.order_json.length
                    })
                    break;
                case tableLabels[3]:
                    tmpArray = tmpArray.sort((a) => {
                        if (a.seen) {
                            return 1;
                        } else {
                            return 0
                        }
                    })
            }

                setSortedOrders(tmpArray)
        }
    }, [filter, orders]);

    useEffect(() => {
        return () => {
            if (orders !== undefined) {
                orders.forEach((order) => {
                    if (!order.seen) {
                        const cOrder = {...order}
                        cOrder.seen = true;
                        changeOrder(cOrder)
                    }
                })
            }
        }
    }, [sortedOrders]);

    return (
        <div className={"flexbox-column"}>
            <div className={"flexbox-sb-c"}>
                <div className={"w-20"}>
                    <SelectableText label={tableLabels[0]} isSelected={filter === tableLabels[0]} onClick={() => {
                        setFilter(tableLabels[0])
                    }}/>
                </div>
                <div className={"w-20"}>
                    <SelectableText label={tableLabels[1]} isSelected={filter === tableLabels[1]} onClick={() => {
                        setFilter(tableLabels[1])
                    }}/>
                </div>
                <div className={"w-20"}>
                    <SelectableText label={tableLabels[2]} isSelected={filter === tableLabels[2]} onClick={() => {
                        setFilter(tableLabels[2])
                    }}/>
                </div>
                <div className={"w-20"}>
                    <SelectableText label={tableLabels[3]} isSelected={filter === tableLabels[3]} onClick={() => {
                        setFilter(tableLabels[3])
                    }}/>
                </div>
                <div className={"w-20 flexbox-line jc-e"} >
                    Действия/Статус
                </div>
            </div>
            <hr style={{margin: "10px 0 0px 0"}}/>
            {(orders !== undefined) ? sortedOrders.map((order, index) => <AdminOrderEntity
                key={index} onChange={async (nOrder) => {
                    await changeOrder(nOrder)
                    await refetch()
            }} order={order} />) : null}
        </div>
    )
}

type adminOrderEntityProps = {
    order: IAdminOrder,
    onChange(order: IAdminOrder): Promise<void>
}

const AdminOrderEntity: FC<adminOrderEntityProps> = ({order, onChange}) => {
    const {order_status, order_id, seen, order_json, stamp, name, surname, patronymic} = order
    const navigate = useNavigate()

    return (
        <div className={"pos-r"}>
            <div onClick={() => {
                navigate(`/admin/orders/${order_id}`)
            }} className={"flexbox-sb-c admin-order-entity"}>
                <div className={"w-20"}>
                    {new Date(stamp).toLocaleDateString()} {new Date(stamp).toLocaleTimeString()}
                </div>
                <div className={"w-20"}>
                    {`${surname} ${name} ${patronymic}`.length > 20 ? `${surname} ${name} ${patronymic}`.slice(0, 20) + '...' : `${surname} ${name} ${patronymic}`}
                </div>
                <div className={"w-20"}>
                    {order_json.length}
                </div>
                <div className={"w-20"}>
                    {seen ? "Просмотрено" : "Новый"}
                </div>
                <div className={"w-20"}>
                </div>
            </div>
            <div className={"pos-a flexbox-line al-i-c"} style={{
                right: "0%",
                top: "0%",
                height: 40,
            }}>
                {OrderStatuses.processing === order_status ? <div className={"flexbox-line al-i-c jc-e"}>
                    <Icon size={30} icon={AppIcons.done} onClick={async () => {
                        const cOrder = {...order}
                        cOrder.order_status = OrderStatuses.ordering
                        await onChange(cOrder)
                    }}/>
                    <Icon size={30} icon={AppIcons.close} onClick={async () => {
                        const cOrder = {...order}
                        cOrder.order_status = OrderStatuses.admin_declined
                        await onChange(cOrder)
                    }}/>
                </div> : <div className={"flexbox-line al-i-c jc-e"}>
                    {order_status}
                </div>}
            </div>
        </div>
    )
}

export default AdminOrders