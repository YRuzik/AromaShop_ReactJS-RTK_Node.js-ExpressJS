import "./authRegistration.css"
import LoginForm from "./loginForm.tsx";
import Icon, {AppIcons} from "../../../../widgets/icon.tsx";
import {useNavigate} from "react-router-dom";
import RegistrationForm from "./registrationForm.tsx";
import {useEffect, useState} from "react";

const AuthLayout = () => {
    const [login, setLogin] = useState(true)
    const navigator = useNavigate()
    let container = document.getElementById("formm")
    useEffect(() => {
        if (container != null) {
            if (login) {
                container.style.transform = "translateX(186%)"
            } else {
                container.style.transform = "translateX(0%)"
            }
        } else {
            container = document.getElementById("formm")
        }
    }, [login, container])
    return (
        <div className={"auth-layout-bg"}>
            <div className={"close-icon"}>
                <Icon icon={AppIcons.close} onClick={() => navigator(-1)}/>
            </div>
            <div className={"form-bg"} id={"formm"}>
                {login ? <LoginForm changeState={() => setLogin(false)}/> : <RegistrationForm changeState={() => setLogin(true)}/>}
            </div>
        </div>
    )
}

export default AuthLayout