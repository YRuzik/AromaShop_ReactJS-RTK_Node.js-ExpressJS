import { useNavigate } from "react-router-dom";

type PreviewBlockProps = {
  route: string;
  title: string;
  subtitle: string;
  photo: string;
};
const PreviewBlock = ({
  route,
  title,
  subtitle,
  photo,
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
        <div className="w-50" style={{ marginBottom: "-12%" }}>
          <img src={photo} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default PreviewBlock;
