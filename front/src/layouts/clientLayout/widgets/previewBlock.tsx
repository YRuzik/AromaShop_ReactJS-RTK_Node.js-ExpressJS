import {useNavigate} from "react-router-dom";
import {publicUrl} from "../../../utils/common.ts";

type PreviewBlockProps = {
    route: string;
    title: string;
    subtitle: string;
    photo?: string;
    server_photo?: string;
};
const PreviewBlock = ({
                          route,
                          title,
                          subtitle,
                          photo,
                          server_photo
                      }: PreviewBlockProps) => {
    const navigator = useNavigate()
    return (
        <div className="preview-block">
            <div className="mask-bg"></div>

            <div className="body-container flexbox-sb-c">
                <div className="w-50">
                    <div>
                        <span style={{cursor: 'pointer'}} onClick={() => navigator("/")}>Главная /</span> {route}
                    </div>
                    <h1>{title.toUpperCase()}</h1>
                    {subtitle}
                </div>
                <div className="w-50" style={{marginBottom: "-12%"}}>
                    {server_photo ?
                        <img src={`${publicUrl}${server_photo}`} className={"preview-block-server-image"}/> :
                        <img src={photo} width={"100%"}/>}
                </div>
            </div>
        </div>
    );
};

export default PreviewBlock;
