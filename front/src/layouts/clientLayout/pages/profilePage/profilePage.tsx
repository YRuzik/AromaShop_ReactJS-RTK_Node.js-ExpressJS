import ProfileInfo from "./profileInfo.tsx";
import "./profilePage.css"
import ProfileOrders from "./profileOrders.tsx";
import PreviewBlock from "../../widgets/previewBlock.tsx";
import preview from "../../../../assets/img/previews/profile.png"

const ProfilePage = () => {
    return (
        <>
            <PreviewBlock route={"Личный кабинет"} title={"Личный кабинет"}
                          subtitle={"Управляйте и просматривайте свои заказы, свои личные данные здесь."} photo={preview}/>
            <div className={"body-container"}>
                <div className={"profile-container"}>
                    <ProfileInfo/>
                    <ProfileOrders/>
                </div>
            </div>
        </>
    )
}

export default ProfilePage