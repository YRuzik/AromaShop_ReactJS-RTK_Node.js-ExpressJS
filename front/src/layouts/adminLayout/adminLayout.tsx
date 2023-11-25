import {Outlet} from "react-router-dom";
import "./adminLayout.css"
import {useEffect} from "react";
import AdminMenu from "./widgets/adminMenu.tsx";

const AdminLayout = () => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        window.scrollTo(0,0)
        return () => {
            document.body.style.overflow = "auto"
        }
    }, []);

    return (
        <div className={"admin-layout"}>
            <div className={"flexbox-line"} style={{height: "95vh", paddingTop: "5vh"}}>
                <AdminMenu/>
                <div className={"admin-content-container w-75 pos-r"}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout