import {useChangeProductMutation} from "../../../../utils/redux/features/admin/adminApiSlice.ts";
import {useFetchSingleProductQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import {useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup"

const AdminChangeProduct = () => {
    const {id} = useParams()
    const {data: product} = useFetchSingleProductQuery(id ?? "")
    const [changeProduct] = useChangeProductMutation()
    return (
        <div>
            {(product !== undefined) ? <div>
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
                            t_id: Yup.number().required("Тип не может быть пустфс"),
                            cat_id: Yup.number().required("Категория не может быть пустой"),
                            available: Yup.boolean(),
                            creation_date: Yup.date().required("Дата не может быть пустой"),
                            quantity: Yup.number().required("Количество не может быть пустым")
                        })}

                        onSubmit={(v) => console.log(v)}>
                    <Form>

                    </Form>
                </Formik>
            </div> : null}
        </div>
    )
}

export default AdminChangeProduct