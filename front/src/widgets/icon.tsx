import person_i from "../assets/icons/person.svg"
import cart_i from "../assets/icons/cart.svg"
import fast_i from "../assets/icons/fast.svg"
import logout_i from "../assets/icons/logout.svg"
import star_bg_i from "../assets/icons/star_bg.svg"
import star_i from "../assets/icons/star.svg"
import support_i from "../assets/icons/support.svg"
import login_i from "../assets/icons/login.svg"
import close_i from "../assets/icons/close.svg"

export enum AppIcons {
    person = person_i,
    cart = cart_i,
    fast = fast_i,
    logout = logout_i,
    star_bg = star_bg_i,
    star = star_i,
    support = support_i,
    login = login_i,
    close = close_i
}

type IconProps = {
    icon: AppIcons;
    size?: number;
    color?: string;
    onClick?: Function;
}

const Icon = ({icon, size = 45, color, onClick}: IconProps) => {
    return <div onClick={() => onClick?.call(this)} className={onClick != null ? "icon-hover" : ""} style={{padding: 7}}>
        <img src={icon} width={size} height={size} style={{fill: color}}/>
    </div>
}

export default Icon