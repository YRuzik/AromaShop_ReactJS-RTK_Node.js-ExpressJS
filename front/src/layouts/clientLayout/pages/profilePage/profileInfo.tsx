import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../../utils/redux/features/auth/authSlice.ts";
import ElevatedButton from "../../../../widgets/elevatedButton.tsx";
import {useNavigate} from "react-router-dom";

const ProfileInfo = () => {
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    return (
        <div className={"profile-block-container w-100"}>
            <h1 style={{marginBottom: "25px"}}>Личные данные</h1>
            {(user !== null) ? <div className={"flexbox-column"}>
                <div>
                    <span>Идентификатор</span>: {user.id}
                </div>
                <div>
                    <span>Фамилия</span>: {user.surname}
                </div>
                <div>
                    <span>Имя</span>: {user.name}
                </div>
                {user.patronymic ? <div>
                    <span>Отчество</span>: {user.patronymic}
                </div> : null}
                <div>
                    <span>Логин</span>: {user.login}
                </div>
                <div style={{paddingBottom: "20px"}}>
                    <span>Электронная почта</span>: {user.email}
                </div>
                {user.role === "admin" ? <ElevatedButton onClick={() => {
                    navigate("/admin")
                }} label={"Админ-панель"}/> : null}
            </div> : null}
        </div>
    )
}

export default ProfileInfo