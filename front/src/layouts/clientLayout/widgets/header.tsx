import {Labels} from "../../../labels";
import Icon, {AppIcons} from "../../../widgets/icon";
import SearchBar from "../../../widgets/searchBar";
import logo from "../../../assets/logo.png"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentToken, selectCurrentUser} from "../../../utils/redux/features/auth/authSlice.ts";
import ModalCart from "./modalCart.tsx";
import {useState} from "react";

const Header = () => {
    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    return (
        <>
            <ModalCart isOpen={isOpen} onClose={() => setOpen(false)}/>
            <div className="pos-a w-100" style={{paddingTop: 20}}>
                <div className="body-container flexbox-sb-c">
                    <div className="flexbox-line al-i-c">
                        <img src={logo} width={80} onClick={() => navigate("/")} style={{cursor: 'pointer'}} alt={"logo"}/>
                        <h1 style={{letterSpacing: '10px'}}>{Labels.companyName.toUpperCase()}</h1>
                    </div>
                    <div></div>

                    <SearchBar/>
                    {/*<div className={"w-25"}>*/}
                    {/*    <ElevatedButton label="+380 630 130 103" onClick={() => {*/}
                    {/*    }}/>*/}
                    {/*</div>*/}
                    {token && user ? <div className={"flexbox-line"}><Icon icon={AppIcons.person} color="red"/><Icon
                        icon={AppIcons.logout} color="red" onClick={() => {
                        dispatch(logOut())
                    }}/></div> : <div className={"flexbox-line"}>
                        <Link to={"/login"} className={"link-style mr-10"}>Войти</Link>
                        <Link to={"/login"} className={"link-style"}>Зарегистрироваться</Link>
                        {/*<Icon icon={AppIcons.login} onClick={() => navigate("/login")}/>*/}
                    </div>}
                    <Icon icon={AppIcons.cart} onClick={() => setOpen(true)}/>

                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
