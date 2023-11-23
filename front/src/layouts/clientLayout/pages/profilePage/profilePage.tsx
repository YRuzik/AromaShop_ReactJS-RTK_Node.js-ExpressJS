import ProfileInfo from "./profileInfo.tsx";
import "./profilePage.css"
import ProfileOrders from "./profileOrders.tsx";
import PreviewBlock from "../../widgets/previewBlock.tsx";
import preview from "../../../../assets/img/previews/profile.png"
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../../../utils/redux/features/auth/authSlice.ts";
import {Navigate, useLocation} from "react-router-dom";

const ProfilePage = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    return (
        token ? <>
            <PreviewBlock route={"Личный кабинет"} title={"Личный кабинет"}
                          subtitle={"Управляйте и просматривайте свои заказы, свои личные данные здесь."} photo={preview}/>
            <div className={"body-container"}>
                <div className={"profile-container"}>
                    <ProfileInfo/>
                    <ProfileOrders/>
                </div>
            </div>
        </> : <Navigate to={'/'} state={{from: location}} replace/>
    )
}

export default ProfilePage