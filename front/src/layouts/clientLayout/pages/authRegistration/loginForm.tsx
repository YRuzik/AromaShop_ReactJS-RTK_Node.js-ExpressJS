import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import ElevatedButton, {ButtonStyles} from "../../../../widgets/elevatedButton.tsx";
import {useLoginMutation} from "../../../../utils/redux/features/auth/authApiSlice.ts";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../../../utils/redux/features/auth/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type LoginFormProps = {
    changeState?: Function
}
const LoginForm = ({changeState}: LoginFormProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const [serverError, setServerError] = useState("")

    const handleSubmit = async (identity: string, pwd: string) => {
        try {
            const userData = await login({login: identity, password: pwd}).unwrap()
            dispatch(setCredentials(userData))
            localStorage.setItem("aroma-token", userData.accessToken)
            navigate("/")
        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                setServerError(err.message)
            }
        }
    }

    return (
        <div className={"login-form mr-10 ml-10"}>
            <Formik
                initialValues={
                    {
                        login: '',
                        password: '',
                    }
                }
                validationSchema={Yup.object({
                    password: Yup.string().required("* Обязательное поле").min(6, "Пароль должен содержать не менее 6 символов"),
                })}
                onSubmit={(values) => console.log(values)}>
                {(values) => {
                    return (<Form className={"flexbox-column h-100 jc-c pb-5"}>
                        <div>
                            <h1>Авторизация</h1>
                            <div className={"pb-5"}>
                                <div className={"pb-1"}>
                                    <label>
                                        Логин
                                    </label>
                                </div>
                                <Field
                                    className={"outlined-input"}
                                    name={"login"}
                                    id={"login"}
                                    type={"login"}
                                    placeholder={"exampleDestroyer"}
                                />
                                <div className={"error-message"}>
                                    <ErrorMessage name={"login"}/>
                                </div>
                            </div>
                            <div className={"pb-5"}>
                                <div className={"pb-1"}>
                                    <label>
                                        Пароль
                                    </label>
                                </div>
                                <Field
                                    className={"outlined-input"}
                                    name={"password"}
                                    id={"password"}
                                    type={"password"}
                                    placeholder={"*******"}
                                />
                                <div className={"error-message"}>
                                    <ErrorMessage name={"password"}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            {serverError}
                        </div>
                        <div className={"w-100"} style={{height: 40}}>
                            <ElevatedButton onClick={async () => {
                                await handleSubmit(values.values.login, values.values.password)
                                values.isSubmitting = false;
                            }} label={"Войти"} disabled={!(values.isValid && values.dirty) || values.isSubmitting}/>
                        </div>
                        <div className={"flexbox-sb-c"} style={{height: 75}}>
                            <div>
                                Не зарегистрированы у нас?
                            </div>
                            <div className={"w-50"} style={{height: 50}}>
                                <ElevatedButton onClick={() => {
                                    if (changeState != null) {
                                        changeState()
                                    }
                                }} label={"Зарегистрироваться"} style={ButtonStyles.white}/>
                            </div>
                        </div>
                    </Form>)
                }}
            </Formik>
        </div>
    )
}

export default LoginForm