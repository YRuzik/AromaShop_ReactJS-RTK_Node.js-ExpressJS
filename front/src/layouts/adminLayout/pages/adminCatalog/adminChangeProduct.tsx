import {
    useChangeProductMutation,
    useFetchAdditionalInfoQuery
} from "../../../../utils/redux/features/admin/adminApiSlice.ts";
import {useFetchSingleProductQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useEffect, useState} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import ElevatedButton, {ButtonStyles} from "../../../../widgets/elevatedButton.tsx";

const AdminChangeProduct = () => {
    const {id} = useParams()
    const {data: pr} = useFetchSingleProductQuery(id ?? "")
    const {data: info} = useFetchAdditionalInfoQuery()
    const [product, setProduct] = useState<IProduct | null>(null)
    const [changeProduct] = useChangeProductMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if ((pr === null)) {
            setProduct({
                category: "",
                country: "",
                product_id: "",
                stamp: "",
                type_name: "",
                title: "",
                image_url: "",
                price: 0,
                c_id: 0,
                t_id: 0,
                cat_id: 0,
                available: false,
                creation_date: "",
                quantity: 0
            })
        } else if (pr !== undefined) {
            setProduct(pr!)
        }
    }, [pr]);

    return (
        <>
            <div>
                {(product !== null) && (info !== undefined) ? <div>
                    <Formik initialValues={
                        {
                            title: product.title,
                            image_url: product.image_url,
                            price: product.price,
                            c_id: product.c_id,
                            t_id: product.t_id,
                            cat_id: product.cat_id,
                            available: product.available,
                            creation_date: product.creation_date,
                            quantity: product.quantity
                        }
                    }
                            validationSchema={Yup.object({
                                title: Yup.string().required("Поле не может быть пустым"),
                                image_url: Yup.string().required("Фото не может быть пустым"),
                                price: Yup.number().required("Цена не может быть пустой"),
                                c_id: Yup.number().required("Страна не может быть пустой"),
                                t_id: Yup.number().required("Тип не может быть пустой"),
                                cat_id: Yup.number().required("Категория не может быть пустой"),
                                available: Yup.boolean(),
                                creation_date: Yup.date().required("Дата не может быть пустой"),
                                quantity: Yup.number().required("Количество не может быть пустым")
                            })}

                            onSubmit={(v) => console.log(v)}>
                        {(values) => {
                            return (
                                <Form>
                                    <h1 className={"pb-1"}>
                                        {product.product_id ? "Редактирование товара" : "Создание товара"}
                                    </h1>
                                    <div className={"pb-1"}>
                                        <div>
                                            <label>
                                                Название
                                            </label>
                                        </div>
                                        <div>
                                            <Field
                                                className={"outlined-input"}
                                                name={"title"}
                                                id={"title"}
                                                type={"title"}
                                                placeholder={"exampleDestroyer"}
                                            />
                                        </div>
                                    </div>
                                    <div className={"pb-1"}>
                                        <div>
                                            <label>
                                                Цена
                                            </label>
                                        </div>
                                        <div>
                                            <Field
                                                className={"outlined-input"}
                                                name={"price"}
                                                id={"price"}
                                                type={"price"}
                                                placeholder={"199"}
                                            />
                                        </div>
                                    </div>
                                    <div className={"pb-1"}>
                                        <div>
                                            <label>
                                                Категория
                                            </label>
                                        </div>
                                        <div>
                                            <select
                                                className={"outlined-input"}
                                                name={"cat_id"}
                                                id={"cat_id"}
                                                placeholder={"exampleDestroyer"}
                                            >
                                                {info.categories.map((obj, i) => <option key={i}>{obj.category}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"pb-1"}>
                                        <div>
                                            <label>
                                                Тип товара
                                            </label>
                                        </div>
                                        <div>
                                            <select
                                                className={"outlined-input"}
                                                name={"t_id"}
                                                id={"t_id"}
                                                placeholder={"exampleDestroyer"}
                                            >
                                                {info.types.map((obj, i) => <option key={i}>{obj.type_name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"pb-1"}>
                                        <div>
                                            <label>
                                                Страна производства
                                            </label>
                                        </div>
                                        <div>
                                            <select
                                                className={"outlined-input"}
                                                name={"c_id"}
                                                id={"c_id"}
                                                placeholder={"exampleDestroyer"}
                                            >
                                                {info.countries.map((obj, i) => <option key={i}>{obj.country}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={"pb-1"}>
                                        <div>
                                            <label>
                                                Год выпуска
                                            </label>
                                        </div>
                                        <div>
                                            <Field
                                                className={"outlined-input"}
                                                name={"creation_date"}
                                                id={"creation_date"}
                                                type={"creation_date"}
                                                placeholder={"exampleDestroyer"}
                                            />
                                        </div>
                                    </div>
                                    <div className={"pb-1"}>
                                        <div>
                                            <label style={{paddingRight: '10px'}}>
                                                Доступен
                                            </label>
                                            <Field
                                                name={"creation_date"}
                                                id={"creation_date"}
                                                type={"checkbox"}
                                                placeholder={"exampleDestroyer"}
                                            />
                                        </div>
                                    </div>
                                    <div className={"admin-catalog-save flexbox-line"}>
                                        <div className={"w-10 mr-1"}>
                                            <ElevatedButton onClick={() => {
                                            }} label={"Сохранить"} disabled={!values.dirty}/>
                                        </div>
                                        <div className={"w-10"}>
                                            <ElevatedButton onClick={() => {
                                                navigate(-1)
                                            }} label={"Отменить"} style={ButtonStyles.black}/>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div> : null}
            </div>
        </>
    )
}

export default AdminChangeProduct