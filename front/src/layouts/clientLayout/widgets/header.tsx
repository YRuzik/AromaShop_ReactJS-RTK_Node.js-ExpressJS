import { Labels } from "../../../labels";
import ElevatedButton from "../../../widgets/elevatedButton";
import Icon, { AppIcons } from "../../../widgets/icon";
import SearchBar from "../../../widgets/searchBar";
import logo from "../../../assets/logo.png"
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentToken, selectCurrentUser} from "../../../utils/redux/features/auth/authSlice.ts";

const Header = () => {
  const navigate = useNavigate()
  const token = useSelector(selectCurrentToken)
  const user = useSelector(selectCurrentUser)
  return (
    <div className="pos-a w-100" style={{paddingTop: 20}}>
      <div className="body-container flexbox-sb-c">
        <div className="flexbox-line al-i-c">
        <img src={logo} width={80} onClick={() => navigate("/")} style={{cursor: 'pointer'}} alt={"logo"}/>
          <h1 style={{letterSpacing: '10px'}}>{Labels.companyName.toUpperCase()}</h1>
        </div>
        <div></div>

        <SearchBar/>
        <div className={"w-25"}>
          <ElevatedButton label="+380 630 130 103" onClick={() => {}} />
        </div>
        {token ? <div>{`Welcome ${user}`}</div> : <div className={"flexbox-line"}>
          <Icon icon={AppIcons.person} color="red"/>
          <Icon icon={AppIcons.login} onClick={() => navigate("/login")}/>
        </div>}

        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
