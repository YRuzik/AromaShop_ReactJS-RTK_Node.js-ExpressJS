import Icon, {AppIcons} from "../../../../widgets/icon.tsx";
import {useNavigate} from "react-router-dom";
import {useFetchCategoriesQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ElevatedButton, {ButtonStyles} from "../../../../widgets/elevatedButton.tsx";
import {useChangeCategoryMutation} from "../../../../utils/redux/features/admin/adminApiSlice.ts";
import {useState} from "react";
import {ICategory} from "../../../../utils/interfaces/icommon.ts";

const AdminCatalogCategories = () => {
    const navigate = useNavigate()
    const {data: categories, refetch} = useFetchCategoriesQuery()
    const [changeCategory] = useChangeCategoryMutation()
    return (
        <>
            <div>
                <div className={"flexbox-sb-s"}>
                    <h1>Категории</h1>
                    <Icon icon={AppIcons.close} onClick={() => {
                        navigate(-1)
                    }}/>
                </div>
                <div className={"flexbox-column mt-1"}>
                    <div className={"flexbox-line al-i-c"}>
                        <div className={"w-25"}>
                            <h3>Идентификатор</h3>
                        </div>
                        <div className={"w-50"}>
                            <h3>Название категории</h3>
                        </div>
                        <div className={"flexbox-line jc-e w-50"}>

                        </div>
                    </div>
                        <Formik

                            initialValues={
                                {
                                    category: "",
                                    category_id: 0
                                }
                            }

                            onSubmit={async (v, {resetForm}) => {
                                try {
                                    await changeCategory(v)
                                    await refetch()
                                    resetForm()
                                } catch (e) {
                                    console.log(e)
                                }
                            }}>
                            {(values) => <Form className={"w-100"}>
                                {(categories !== undefined) ? categories.map((category, index) => <div key={index}
                                                                                                       className={"flexbox-line al-i-c admin-order-entity"}
                                                                                                       style={{cursor: "auto"}}>
                                    <div className={"w-25"}>
                                        {category.category_id}
                                    </div>
                                    <div className={"w-50"}>
                                        {category.category}
                                    </div>
                                    <div className={"flexbox-line jc-e w-50"}>
                                        <Icon size={30} onClick={async () => {
                                            await values.setFieldValue("category", category.category)
                                            await values.setFieldValue("category_id", category.category_id)
                                        }} icon={AppIcons.edit}/>
                                        <Icon size={30} onClick={async () => {
                                            try {
                                                const cCategory = {...category}
                                                cCategory.deleted = true;
                                                await changeCategory(cCategory)
                                                await refetch()
                                                values.resetForm()
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }} icon={AppIcons.close}/>
                                    </div>
                                </div>) : null}
                                <div className={"admin-bottom-panel"}>
                                    <div className={"w-10 flexbox-line"}>
                                        <label>id: </label>
                                        <Field name={"category_id"} id={"category_id"} disabled={true}/>
                                    </div>
                                    <div className={"flexbox-line w-100"}>
                                        <div className={"w-100"}>
                                            <Field
                                                className={"outlined-input"}
                                                placeholder={"Название..."}
                                                name={"category"}
                                                id={"category"}
                                            />
                                        </div>
                                        <div className={"error-message"} style={{width: 'auto'}}>
                                            <ErrorMessage name={"category"}/>
                                        </div>
                                        <div style={{height: 30, width: "25%", marginLeft: "10px"}}>
                                            <ElevatedButton type={"submit"} onClick={() => {
                                            }} label={"Сохранить"}
                                                            disabled={!values.isValid || !values.dirty || values.isSubmitting || (values.values.category.length === 0)}/>
                                        </div>
                                        <div style={{height: 30, width: "25%", marginLeft: "10px"}}>
                                            <ElevatedButton style={ButtonStyles.black} onClick={async () => {
                                                values.resetForm()
                                                await values.setFieldValue("category_id", 0)
                                            }} label={"Сбросить"}/>
                                        </div>
                                    </div>
                                </div>
                            </Form>}
                        </Formik>
                </div>
            </div>
        </>
    )
}

export default AdminCatalogCategories