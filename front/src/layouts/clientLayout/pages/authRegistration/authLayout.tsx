import "./authRegistration.css"
import LoginForm from "./loginForm.tsx";
import Icon, {AppIcons} from "../../../../widgets/icon.tsx";
import {useNavigate, useParams} from "react-router-dom";
import RegistrationForm from "./registrationForm.tsx";
import {useEffect, useState} from "react";

const AuthLayout = () => {
    const {type} = useParams()
    const [login, setLogin] = useState(true)
    const navigate = useNavigate()
    let container = document.getElementById("formm")

    useEffect(() => {
        window.document.body.style.overflow = "hidden"
        return () => {
            window.document.body.style.overflow = "auto"
        }
    }, []);

    useEffect(() => {
        if (type !== undefined) {
            console.log(type)
            if (type === "registration") {
                setLogin(false)
            } else if (type === "login") {
                setLogin(true)
            }
        }
    }, [type]);

    useEffect(() => {
        if (container !== null) {
            if (login) {
                container.style.transform = "translateX(0%)"
            } else {
                container.style.transform = "translateX(186%)"
            }
        } else {
            container = document.getElementById("formm")
        }
    }, [login, container])
    return (
        <div className={"auth-layout-bg"}>
            <div className={"close-icon"}>
                <Icon icon={AppIcons.close} onClick={() => navigate("/")}/>
            </div>
            <div className={"form-bg"} id={"formm"}>
                {login ? <LoginForm changeState={() => navigate("/auth/registration")}/> :
                    <RegistrationForm changeState={() => navigate("/auth/login")}/>}
            </div>
        </div>
    )
}

export default AuthLayout