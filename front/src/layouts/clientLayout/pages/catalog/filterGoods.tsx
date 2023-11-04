import { useState } from "react";
import { filterToString } from "../../../../formatters/enumToString";

export enum FilterTypes {
  all,
  aroma,
  usual,
  long,
  small,
  special,
  collabs,
}

const FilterGoods = () => {
  const [selectedFilter, setFilter] = useState(FilterTypes.all);
  const filters = [
    FilterTypes.all,
    FilterTypes.aroma,
    FilterTypes.long,
    FilterTypes.small,
    FilterTypes.collabs,
    FilterTypes.special,
    FilterTypes.usual,
  ];
  return (
    <div className="flexbox-line filter-container">
      {filters.map((e, i) => (
        <div key={i} className="w-100 filter-box">
          <div className="filter-indicator" style={{backgroundColor: selectedFilter === e ? "var(--main-black)" : ""}}></div>
          <h2 className="filter-label" style={{color: selectedFilter === e ? "var(--main-black)" : ""}} onClick={() =>{setFilter(e)}}>{filterToString(e)}</h2>
        </div>
      ))}
    </div>
  );
};

export default FilterGoods;
