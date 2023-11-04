import cocacola from "../../../assets/img/partners/cocacola.png";
import atlas from "../../../assets/img/partners/atlas.png";
import crazybox from "../../../assets/img/partners/crazybox.png";
import nike from "../../../assets/img/partners/nike.png";
import xbox from "../../../assets/img/partners/xbox.png";
import chrome from "../../../assets/img/partners/chrome.png";
import { useEffect, useState } from "react";
const Slider = () => {
  const [current, setCurrent] = useState(0);
  const imgs = [cocacola, atlas, crazybox, nike, xbox, chrome];

  let scrollObj = document.getElementById("slider-scroller");

  useEffect(() => {
    scrollObj = document.getElementById("slider-scroller");
    if (scrollObj !== null) {
      scrollObj.style.transform = `translateX(${current}%)`;
    }
  }, [current]);

  function goNext() {
    if (scrollObj !== null) {
      setCurrent(current - 25);
    }
    console.log(current);
  }

  function goPrev() {
    if (scrollObj !== null) {
      setCurrent(current + 25);
    }
    console.log(current);
  }

  return (
    <div className="body-container pos-r" style={{ overflowX: "hidden" }}>
      <div>
        {current == 0 ? null : (
          <div className="mi-button prev" onClick={() => goPrev()}>
            {"<"}
          </div>
        )}
      </div>
      <div className="mi-scroll-ops">
        <div className="mi-slider-scroller" id="slider-scroller">
          {imgs.map((item, index) => {
            return <SliderItem img={item} key={index} />;
          })}
        </div>
      </div>
      <div>
        {current == -2 * 25 ? null : (
          <div className="mi-button next" onClick={() => goNext()}>
            {">"}
          </div>
        )}
      </div>
    </div>
  );
};

type SliderItemProps = {
  img: string;
};

const SliderItem = ({ img }: SliderItemProps) => {
  return (
    <div className="mi-slide">
      <img src={img} className="mi-img" />
    </div>
  );
};

export default Slider;
