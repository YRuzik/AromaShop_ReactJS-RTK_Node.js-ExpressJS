import {FC, useEffect, useState} from "react";
import {
    useFetchCategoriesQuery,
} from "../../../../utils/redux/features/common/commonApiSlice.ts";
import {filtersArray} from "./goods.tsx";
import Icon, {AppIcons} from "../../../../widgets/icon.tsx";

type filterGoodsProps = {
    onCategory(s: string): void;
    onFilter(s: string): void;
}

const FilterGoods: FC<filterGoodsProps> = ({onCategory, onFilter}) => {
    const {
        data: categories,
        isLoading,
        isFetching
    } = useFetchCategoriesQuery()
    const [selectedCategory, setCategory] = useState("");
    const [selectedFilter, setFilter] = useState("");

    useEffect(() => {
        if (!isFetching && !isLoading && (categories !== undefined)) {
            setCategory("Все товары")
        }
    }, [isFetching, isLoading]);

    return (
        <div>
            <div className="flexbox-line filter-container">
                <div className="w-100 filter-box">
                    <div className="filter-indicator"
                         style={{backgroundColor: selectedCategory === "Все товары" ? "var(--main-black)" : ""}}></div>
                    <h2 className="filter-label"
                        style={{color: selectedCategory === "Все товары" ? "var(--main-black)" : ""}} onClick={() => {
                        setCategory("Все товары")
                        onCategory("Все товары")
                    }}>{"Все товары"}</h2>
                </div>
                {(categories !== undefined) ? categories.map((e, i) => (
                    <div key={i} className="w-100 filter-box">
                        <div className="filter-indicator"
                             style={{backgroundColor: selectedCategory === e.category ? "var(--main-black)" : ""}}></div>
                        <h2 className="filter-label"
                            style={{color: selectedCategory === e.category ? "var(--main-black)" : ""}} onClick={() => {
                            setCategory(e.category)
                            onCategory(e.category)
                        }}>{e.category}</h2>
                    </div>
                )) : null}
            </div>
            <div className="flexbox-line filter-container">
                <div>
                    <h2>Отфильтровать по:</h2>
                </div>
                {filtersArray.map((filter, i) => (
                    <div onClick={() => {
                        if (selectedFilter === filter) {
                            setFilter("")
                            onFilter("")
                        } else {
                            setFilter(filter)
                            onFilter(filter)
                        }
                    }} className={`f-container flexbox-line al-i-c ${selectedFilter === filter ? "f-container-active" : null}`} key={i}>
                        {selectedFilter === filter ? <Icon icon={AppIcons.done} size={20}/> : null}{filter}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterGoods;
