import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ElevatedButton, {ButtonStyles} from "../../../../widgets/elevatedButton.tsx";
import {
    useRegisterMutation
} from "../../../../utils/redux/features/auth/authApiSlice.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setToaster} from "../../../../utils/redux/features/common/commonSlice.ts";

type RegistrationFormProps = {
    changeState?: Function;
}

const RegistrationForm = ({changeState}: RegistrationFormProps) => {
    const dispatch = useDispatch()
    const regExpKT = RegExp(/^[А-Яа-я -]+$/)
    const regExpLT = RegExp(/^[A-Za-z -]+$/)
    const [register] = useRegisterMutation()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")

    return (
        <>
            <div className={"ml-10 mr-10 registration-form"}>
                <Formik
                    initialValues={
                        {
                            name: '',
                            surname: '',
                            patronymic: '',
                            login: '',
                            email: '',
                            password: '',
                            password_repeat: '',
                            rules: false,
                        }
                    }
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required("* Обязательное поле")
                            .matches(regExpKT, "* Кириллица, тире и пробелы"),
                        surname: Yup.string()
                            .required("* Обязательное поле")
                            .matches(regExpKT, "* Кириллица, тире и пробелы"),
                        patronymic: Yup.string().matches(regExpKT, "* Кириллица, тире и пробелы"),
                        login: Yup.string()
                            .required("* Обязательное поле")
                            .matches(regExpLT, "* Латиница, тире и пробелы"),
                        email: Yup.string().email("* Введите корректный Email").required("* Обязательное поле"),
                        password: Yup.string().required("* Обязательное поле").min(6, "Пароль должен содержать не менее 6 символов"),
                        password_repeat: Yup.string()
                            .required("* Повторите пароль")
                            .oneOf([Yup.ref('password')], '* Пароли должны совпадать'),
                        rules: Yup.boolean().required("* Правила регистрации должны быть приняты")
                    })}
                    onSubmit={async (values) => {
                        try {
                            await register({
                                role: "",
                                name: values.name,
                                surname: values.surname,
                                patronymic: values.patronymic,
                                login: values.login,
                                email: values.email,
                                password: values.password
                            }).unwrap()
                            dispatch(setToaster({isOpen: true, title: "Войдите в аккаунт", message: "Регистрация прошла успешно! Войдите в аккаунт с теми данными, которые вводили при регистрации"}))
                            navigate("/")
                        } catch (err: any) {
                            setServerError(err.data?.message)
                        }
                    }}>
                    {(values) => {
                        return (<Form className={"flexbox-column h-100 jc-c pb-5"}>
                            <div>
                                <h1>Регистрация</h1>
                                <div className={"flexbox-sb-c field-input"}>
                                    <div>
                                        <div className={"pb-1"}>
                                            <label>
                                                Имя
                                            </label>
                                        </div>
                                        <Field
                                            className={"outlined-input"}
                                            name={"name"}
                                            id={"name"}
                                            type={"name"}
                                            placeholder={"Иван"}
                                        />
                                        <div className={"error-message"}>
                                            <ErrorMessage name={"name"}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={"pb-1"}>
                                            <label>
                                                Фамилия
                                            </label>
                                        </div>
                                        <Field
                                            className={"outlined-input"}
                                            name={"surname"}
                                            id={"surname"}
                                            type={"surname"}
                                            placeholder={"Манасов"}
                                        />
                                        <div className={"error-message"}>
                                            <ErrorMessage name={"surname"}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"field-input"}>
                                    <div className={"pb-1"}>
                                        <label>
                                            Отчество
                                            <span>
                                             {" (необязательно)"}
                                        </span>
                                        </label>
                                    </div>
                                    <Field
                                        className={"outlined-input"}
                                        name={"patronymic"}
                                        id={"patronymic"}
                                        type={"patronymic"}
                                        placeholder={"Владимирович"}
                                    />
                                    <div className={"error-message"}>
                                        <ErrorMessage name={"patronymic"}/>
                                    </div>
                                </div>
                                <div className={"field-input"}>
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
                                        placeholder={"example"}
                                    />
                                    <div className={"error-message"}>
                                        <ErrorMessage name={"login"}/>
                                    </div>
                                </div>
                                <div className={"field-input"}>
                                    <div className={"pb-1"}>
                                        <label>
                                            Эл. почта
                                        </label>
                                    </div>
                                    <Field
                                        className={"outlined-input"}
                                        name={"email"}
                                        id={"email"}
                                        type={"email"}
                                        placeholder={"aromashop@example.com"}
                                    />
                                    <div className={"error-message"}>
                                        <ErrorMessage name={"email"}/>
                                    </div>
                                </div>
                                <div className={"field-input"}>
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
                                <div className={""}>
                                    <div className={"pb-1"}>
                                        <label>
                                            Повторите пароль
                                        </label>
                                    </div>
                                    <Field
                                        className={"outlined-input"}
                                        name={"password_repeat"}
                                        id={"password_repeat"}
                                        type={"password"}
                                        placeholder={"*******"}
                                    />
                                    <div className={"error-message"}>
                                        <ErrorMessage name={"password_repeat"}/>
                                    </div>
                                </div>
                                <div className={"pb-5"}>
                                    <div className={"flexbox-line al-i-c"}>
                                        <Field
                                            className={"checkbox-style"}
                                            name={"rules"}
                                            id={"rules"}
                                            type={"checkbox"}
                                        />
                                        <div className={"pl-1"}>
                                            <label>
                                                Я согласен с <span className={"link-style"}>правилами регистрации</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={"error-message"}>
                                        <ErrorMessage name={"rules"}/>
                                    </div>
                                    <div className={"error-message"}>
                                        {serverError}
                                    </div>
                                </div>
                            </div>
                            <div className={"w-100"} style={{height: 40}}>
                                <ElevatedButton type={"submit"} onClick={() => {}} label={"Зарегистрироваться"}
                                                disabled={!(values.isValid && values.dirty && values.values.rules) || values.isSubmitting}/>
                            </div>
                            <div className={"flexbox-sb-c"} style={{height: 75}}>
                                <div>
                                    Уже есть аккаунт?
                                </div>
                                <div className={"w-50"} style={{height: 50}}>
                                    <ElevatedButton onClick={() => {
                                        if (changeState != null) {
                                            changeState()
                                        }
                                        values.isSubmitting = false;
                                    }} label={"Войти"} style={ButtonStyles.white}/>
                                </div>
                            </div>
                        </Form>)
                    }}
                </Formik>
            </div>
        </>
    )
}

export default RegistrationForm