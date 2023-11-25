import {useFetchProductsQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import {FC} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import {publicUrl} from "../../../../utils/common.ts";
import Icon, {AppIcons} from "../../../../widgets/icon.tsx";
import {useNavigate} from "react-router-dom";

const AdminCatalog = () => {
    const {data: products} = useFetchProductsQuery()
    const navigate = useNavigate()
    return (
        <>
            <div className={"flexbox-column"}>
                <div className={"flexbox-sb-c"}>
                    <div className={"w-25"}>
                        <h3>Фото</h3>
                    </div>
                    <div className={"w-25"}>
                        <h3>Название</h3>
                    </div>
                    <div className={"w-25"}>
                        <h3>Цена</h3>
                    </div>
                    <div className={"w-25"}>
                        <h3>Количество (доступно)</h3>
                    </div>
                </div>
                <hr style={{margin: "10px 0 0px 0"}}/>
                {(products !== undefined) ? products.map((product, index) => <AdminCatalogEntity
                    key={index} {...product} />) : null}
            </div>
            <div className={"admin-orders-add-button"}>
                <Icon icon={AppIcons.add} onClick={() => {navigate('/admin/catalog/0')}}/>
            </div>
        </>
    )
}

const AdminCatalogEntity: FC<IProduct> = (product) => {
    const {image_url, title, quantity, price, product_id} = product
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/admin/catalog/${product_id}`)} className={"flexbox-sb-c mb-1 admin-order-entity"}>
            <div className={"w-25"}>
                <img src={`${publicUrl}${image_url}`} style={{objectFit: "cover", width: "50%", height: "100px", borderRadius: "15px"}}
                     alt={title}/>
            </div>
            <div className={"w-25"}>
                {title}
            </div>
            <div className={"w-25"}>
                {price} руб.
            </div>
            <div className={"w-25"}>
                {quantity} шт.
            </div>
        </div>
    )
}

export default AdminCatalog