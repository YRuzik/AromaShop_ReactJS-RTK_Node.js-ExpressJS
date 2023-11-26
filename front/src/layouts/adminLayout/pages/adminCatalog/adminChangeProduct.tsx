import {
    useChangeProductMutation,
    useFetchAdditionalInfoQuery
} from "../../../../utils/redux/features/admin/adminApiSlice.ts";
import {useFetchSingleProductQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useEffect, useState} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import ElevatedButton, {ButtonStyles} from "../../../../widgets/elevatedButton.tsx";
import {publicUrl} from "../../../../utils/common.ts";
import Icon, {AppIcons} from "../../../../widgets/icon.tsx";

const AdminChangeProduct = () => {
    const {id} = useParams()
    const {data: pr} = useFetchSingleProductQuery(id ?? "")
    const {data: info} = useFetchAdditionalInfoQuery()
    const [product, setProduct] = useState<IProduct | null>(null)
    const [changeProduct] = useChangeProductMutation()
    const [error, setError] = useState("")
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

    const handleSubmit = async (nProduct: IProduct) => {
        try {
            await changeProduct(nProduct)
            navigate(-1)
        } catch (e: any) {
            setError(e.message)
        }
    }


    ///TODO fix ts-ignores
    const previewFile = () => {
        let preview = document.getElementById('preview')!;
        // @ts-ignore
        let file = document.getElementById('selectFileInput')!.files[0];
        let reader  = new FileReader();

        reader.onloadend = function () {
            // @ts-ignore
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            // @ts-ignore
            preview.src = "";
        }
    }

    const handleDelete = async (nProduct: IProduct) => {
        try {
            const cProduct = {...nProduct};
            cProduct.deleted = true;
            await changeProduct(cProduct)
            navigate(-1)
        } catch (e: any) {
            setError(e.message)
        }
    }

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
                                // image_url: Yup.string().required("Фото не может быть пустым"),
                                price: Yup.number().required("Цена не может быть пустой"),
                                c_id: Yup.number().required("Страна не может быть пустой"),
                                t_id: Yup.number().required("Тип не может быть пустой"),
                                cat_id: Yup.number().required("Категория не может быть пустой"),
                                available: Yup.boolean(),
                                creation_date: Yup.date().required("Дата не может быть пустой"),
                                quantity: Yup.number().required("Количество не может быть пустым")
                            })}

                            onSubmit={async (values, {setSubmitting}) => {
                                const cProduct: IProduct = {...product, ...values}
                                // @ts-ignore
                                let file = document.getElementById('selectFileInput')!.files[0];
                                await handleSubmit(cProduct)
                                if (file) {
                                    const data = new FormData()
                                    data.append('file', file)
                                    data.append('product_id', product?.product_id)
                                    await fetch("http://localhost:6001/api/admin/upload", {method: "POST", body: data,})
                                }
                                setSubmitting(false)
                            }}>
                        {(values) => {
                            return (
                                <div>
                                    <h1 className={"pb-1"}>
                                        {product.product_id ? "Редактирование товара" : "Создание товара"}
                                    </h1>
                                    <hr style={{marginBottom: "10px"}}/>
                                    <Form className={"flexbox-sb-s"}>
                                        <div className={"w-50"}>
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
                                                        placeholder={"exampleDestroyer"}
                                                    />
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"title"}/>
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
                                                        placeholder={"199"}
                                                    />
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"price"}/>
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
                                                        onChange={async (event) => {
                                                            await values.setFieldValue("cat_id", Number(event.currentTarget.value))
                                                        }}
                                                    >
                                                        {info.categories.slice().sort((a) => a.category_id === product?.cat_id ? 0 : 1).map((obj, i) =>
                                                            <option
                                                                value={obj.category_id}
                                                                key={i}>{obj.category}</option>)}
                                                    </select>
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"cat_id"}/>
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
                                                        onChange={async (event) => {
                                                            await values.setFieldValue("t_id", Number(event.currentTarget.value))
                                                        }}
                                                    >
                                                        {info.types.slice().sort((a) => a.type_id === product?.t_id ? 0 : 1).map((obj, i) =>
                                                            <option
                                                                value={obj.type_id}
                                                                key={i}>{obj.type_name}</option>)}
                                                    </select>
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"t_id"}/>
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
                                                        onChange={async (event) => {
                                                            await values.setFieldValue("c_id", Number(event.currentTarget.value))
                                                        }}
                                                    >
                                                        {info.countries.slice().sort((a) => a.country_id === product?.c_id ? 0 : 1).map((obj, i) =>
                                                            <option
                                                                value={obj.country_id}
                                                                key={i}>{obj.country}</option>)}
                                                    </select>
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"c_id"}/>
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
                                                        placeholder={"2022-04-05"}
                                                    />
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"creation_date"}/>
                                                </div>
                                            </div>
                                            <div className={"pb-1"}>
                                                <div>
                                                    <label>
                                                        Количество
                                                    </label>
                                                </div>
                                                <div>
                                                    <Field
                                                        className={"outlined-input"}
                                                        name={"quantity"}
                                                        id={"quantity"}
                                                        type={"quantity"}
                                                        placeholder={"5"}
                                                    />
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"quantity"}/>
                                                </div>
                                            </div>
                                            <div className={"pb-1"}>
                                                <div>
                                                    <label style={{paddingRight: '10px'}}>
                                                        Доступен
                                                    </label>
                                                    <Field
                                                        name={"available"}
                                                        id={"available"}
                                                        type={"checkbox"}
                                                    />
                                                </div>
                                                <div className={"error-message"}>
                                                    <ErrorMessage name={"available"}/>
                                                </div>
                                            </div>
                                            <div className={"admin-catalog-save"}>
                                                <div className={"error-message"}>
                                                    {error}
                                                </div>
                                                <div className={"flexbox-line"}>
                                                    <div className={"w-10 mr-1"}>
                                                        <ElevatedButton
                                                            type={"submit"}
                                                            onClick={() => {
                                                            }}
                                                            label={"Сохранить"}
                                                            disabled={!values.dirty || values.isSubmitting || !values.isValid}/>
                                                    </div>
                                                    <div className={"w-10"}>
                                                        <ElevatedButton onClick={() => {
                                                            navigate(-1)
                                                        }} label={"Отменить"} style={ButtonStyles.black}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"w-50 pl-1 pt-1"}>
                                            <div style={{
                                                position: 'relative'
                                            }}
                                            className={"admin-select-file-photo"}
                                            >
                                                <div>
                                                    <img src={`${publicUrl}${product?.image_url}`}
                                                         alt={product?.title}
                                                         id={"preview"}
                                                         className={"admin-select-file-photo"}/>
                                                </div>
                                                <div className={"admin-select-file-input"}>
                                                    <Icon icon={AppIcons.edit} onClick={() => {
                                                        const fileInput = document.getElementById("selectFileInput");
                                                        if (fileInput !== null) {
                                                            fileInput.click()
                                                        }
                                                    }}/>
                                                </div>
                                                <input
                                                    style={{display: 'none'}}
                                                    id={"selectFileInput"}
                                                    name="file"
                                                    onChange={() => {
                                                        previewFile()
                                                    }}
                                                    type={"file"}
                                                />
                                            </div>
                                            <div className={"mt-1"}>
                                                <ElevatedButton onClick={async () => {
                                                    await handleDelete(product)
                                                }} label={"Удалить"} style={ButtonStyles.black}/>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            )
                        }}
                    </Formik>
                </div> : null}
            </div>
        </>
    )
}

export default AdminChangeProduct