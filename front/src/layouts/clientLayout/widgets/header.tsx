import {Labels} from "../../../labels";
import Icon, {AppIcons} from "../../../widgets/icon";
import SearchBar from "../../../widgets/searchBar";
import logo from "../../../assets/logo.png"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentToken, selectCurrentUser} from "../../../utils/redux/features/auth/authSlice.ts";
import ModalCart from "./modalCart.tsx";
import {useState} from "react";
import {selectCurrentCart} from "../../../utils/redux/features/common/commonSlice.ts";

const Header = () => {
    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const cart = useSelector(selectCurrentCart)

    return (
        <>
            <ModalCart isOpen={isOpen} onClose={() => setOpen(false)}/>
            <div className="pos-a w-100" style={{paddingTop: 20}}>
                <div className="body-container flexbox-sb-c">
                    <div className="flexbox-line al-i-c">
                        <img src={logo} width={80} onClick={() => navigate("/")} style={{cursor: 'pointer'}}
                             alt={"logo"}/>
                        <h1 style={{letterSpacing: '10px'}}>{Labels.companyName.toUpperCase()}</h1>
                    </div>
                    <SearchBar/>
                    {token && user ? <div className={"flexbox-line"}><Icon onClick={() => {
                        navigate("/profile")
                    }} icon={AppIcons.person} color="red" label={"Профиль"}/><Icon
                        icon={AppIcons.logout} label={"Выйти"} color="red" onClick={() => {
                        dispatch(logOut())
                    }}/></div> : <div className={"flexbox-line"}>
                        <Link to={"/auth/login"} className={"link-style mr-10"}>Войти</Link>
                        <Link to={"/auth/registration"} className={"link-style"}>Зарегистрироваться</Link>
                    </div>}
                    <Icon counterValue={(cart.length > 0) ? cart.length : undefined} icon={AppIcons.cart} onClick={() => setOpen(true)}/>
                </div>
            </div>
        </>
    );
};

export default Header;
