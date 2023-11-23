import {publicUrl} from "../utils/common.ts";
import {useNavigate} from "react-router-dom";

type ImageContainerProps = {
    image: string;
    product_id: string;
}

const ImageContainer = ({image, product_id}: ImageContainerProps) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate(`/catalog/${product_id}`)
        }} className="img-container">
            <img src={`${publicUrl}${image}`}/>
        </div>
    )
}

export default ImageContainer