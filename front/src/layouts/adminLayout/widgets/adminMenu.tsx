import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../utils/redux/features/auth/authSlice.ts";
import Icon, {AppIcons} from "../../../widgets/icon.tsx";
import {FC} from "react";
import {useNavigate} from "react-router-dom";

const AdminMenu = () => {
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    return (
        <div className={"admin-menu w-25"}>
            <div>
                <h1 style={{textAlign: "center"}}>Добрый день, {user !== null ? user.login : null}</h1>
            </div>
            <hr style={{margin: "5% 0 0 0"}}/>
            <div className={"flexbox-column"}>
                <AdminMenuEntity onClick={() => {

                }} icon={AppIcons.support} label={"Заказы"}/>
                <AdminMenuEntity onClick={() => {

                }} icon={AppIcons.cart} label={"Каталог"}/>
                <AdminMenuEntity onClick={() => {
                    navigate("/")
                }} icon={AppIcons.logout} label={"Выйти"}/>
            </div>
        </div>
    )
}

type AdminMenuEntityProps = {
    icon: AppIcons,
    label: string,
    onClick(): void
}

const AdminMenuEntity: FC<AdminMenuEntityProps> = ({icon, label, onClick}) => {
    return (
        <div onClick={() => onClick()} className={"admin-menu-entity"}>
            <Icon icon={icon} label={label}/>
        </div>
    )
}

export default AdminMenu