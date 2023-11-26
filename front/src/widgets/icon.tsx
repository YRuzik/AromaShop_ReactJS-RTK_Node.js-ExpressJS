import person_i from "../assets/icons/person.svg"
import cart_i from "../assets/icons/cart.svg"
import fast_i from "../assets/icons/fast.svg"
import logout_i from "../assets/icons/logout.svg"
import star_bg_i from "../assets/icons/star_bg.svg"
import star_i from "../assets/icons/star.svg"
import support_i from "../assets/icons/support.svg"
import login_i from "../assets/icons/login.svg"
import close_i from "../assets/icons/close.svg"
import done_i from "../assets/icons/done.svg"
import home_i from "../assets/icons/home.svg"
import add_i from "../assets/icons/add.svg"
import sell_i from "../assets/icons/sell.svg"
import circle_i from "../assets/icons/circle.svg"
import edit_i from "../assets/icons/edit.svg"
import categories_i from "../assets/icons/categories.svg"

export enum AppIcons {
    person = person_i,
    cart = cart_i,
    fast = fast_i,
    logout = logout_i,
    star_bg = star_bg_i,
    star = star_i,
    support = support_i,
    login = login_i,
    close = close_i,
    done = done_i,
    home = home_i,
    add = add_i,
    sell = sell_i,
    circle = circle_i,
    edit = edit_i,
    categories = categories_i
}

type IconProps = {
    icon: AppIcons;
    size?: number;
    color?: string;
    onClick?: Function;
    counterValue?: number;
    label?: string;
}

const Icon = ({icon, label, size = 45, color, onClick, counterValue}: IconProps) => {
    return <div onClick={() => onClick?.call(this)} className={onClick != null ? "icon-hover" : ""}
                style={{padding: 7, position: "relative", display: "flex", alignItems: "center"}}>
        <img src={icon} width={size} height={size} style={{fill: color}}/>
        {counterValue ? <div className={"icon-counter"}>
            {counterValue}
        </div> : null}
        {label ? <div style={{paddingLeft: "5px"}}>{label}</div> : null}
    </div>
}

export default Icon