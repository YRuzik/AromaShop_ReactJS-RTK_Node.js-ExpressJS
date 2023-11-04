import { Labels } from "../../../../labels";
import candles from "../../../../assets/img/candles.png";
import { ReactNode } from "react";
import Icon, { AppIcons } from "../../../../widgets/icon";

const Preview = () => {
  return (
    <div className="body-container">
      <div className="flexbox-sb-s">
        <div className="w-50">
          <h1>{Labels.freshAir.toUpperCase()}</h1>
          <p className="pt-1">{Labels.previewDesc}</p>
          <div className="flexbox-sb-c pt-10">
            <IconAndLabel label={Labels.highQuality} child={<Icon icon={AppIcons.star} color={"red"}/>}/>
            <IconAndLabel label={Labels.supportManager} child={<Icon icon={AppIcons.support}/>}/>
            <IconAndLabel label={Labels.completeOrder} child={<Icon icon={AppIcons.fast}/>}/>
          </div>
        </div>
        <div className="w-50" style={{display: "flex", justifyContent: "end"}}>
          <img src={candles} width={"80%"} />
        </div>
      </div>
    </div>
  );
};

type IconAndLabelProps = {
  label: string;
  child: ReactNode;
};

const IconAndLabel = ({ label, child }: IconAndLabelProps) => {
  return (
    <div className="icon-and-label-container">
      <div className="circle-shape mb-5 flexbox-line al-i-c" style={{justifyContent: 'center'}}>
        {child}
      </div>
      <h2>{label}</h2>
    </div>
  );
};

export default Preview;
