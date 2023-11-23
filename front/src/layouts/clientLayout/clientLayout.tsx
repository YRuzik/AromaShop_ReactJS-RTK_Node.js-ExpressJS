import Header from "./widgets/header.tsx";
import Footer from "./widgets/footer.tsx";
import {Outlet} from "react-router-dom";
import Menu from "./widgets/menu.tsx";

const ClientLayout = () => {
    return (
        <>
            <Header/>
            <div style={{paddingTop: "100px"}}>
                <Menu/>
            </div>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default ClientLayout