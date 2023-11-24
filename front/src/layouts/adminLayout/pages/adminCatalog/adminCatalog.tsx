import {useFetchProductsQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import {FC} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import {publicUrl} from "../../../../utils/common.ts";

const AdminCatalog = () => {
    const {data: products} = useFetchProductsQuery()
    return (
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
    )
}

const AdminCatalogEntity: FC<IProduct> = (product) => {
    const {image_url, title, quantity, price} = product
    return (
        <div className={"flexbox-sb-c mb-1 admin-order-entity"}>
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