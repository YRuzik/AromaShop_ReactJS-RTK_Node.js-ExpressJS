import ImageContainer from "../../../../widgets/imageContainer";
import photo from "../../../../assets/img/mock_photo.jpg";

const TabsPanel = () => {
  return (
    <div className="tabs-panel">
      <div id="large">
        <ImageContainer image={photo} />
      </div>
      <div id="min-1">
        <ImageContainer image={photo} />
      </div>
      <div id="min-2">
        <ImageContainer image={photo} />
      </div>
      <div id="min-3">
        <ImageContainer image={photo} />
      </div>
    </div>
  );
};

export default TabsPanel;
