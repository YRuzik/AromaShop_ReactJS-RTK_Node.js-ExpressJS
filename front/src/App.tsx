import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainPage from "./layouts/clientLayout/pages/mainPage/mainPage"
import Header from "./layouts/clientLayout/widgets/header"
import Footer from "./layouts/clientLayout/widgets/footer"
import CatalogPage from "./layouts/clientLayout/pages/catalog/catalogPage"
import Menu from "./layouts/clientLayout/widgets/menu"
import AboutUsPage from "./layouts/clientLayout/pages/aboutUs/aboutUsPage"
import AuthLayout from "./layouts/clientLayout/pages/authRegistration/authLayout.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCredentials} from "./utils/redux/features/auth/authSlice.ts";
import {useRefreshMutation} from "./utils/redux/features/auth/authApiSlice.ts";

const App = () => {
    const [refresh] = useRefreshMutation()
    const dispatch = useDispatch()

    ///TODO change interfaces
    useEffect(() => {
        if (localStorage.getItem("aroma-token")) {
            refresh().then(v => {
                dispatch(setCredentials(v.data))
            })
        }
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Header/>
                <div className="main-block">
                    <div style={{paddingTop: "100px"}}>
                        <Menu/>
                    </div>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/catalog" element={<CatalogPage/>}/>
                        <Route path="/contacts" element={<AboutUsPage/>}/>
                        <Route path="/login" element={<AuthLayout/>}/>
                    </Routes>
                    <Footer/>
                </div>

            </BrowserRouter>
        </div>
    )
}

export default App
