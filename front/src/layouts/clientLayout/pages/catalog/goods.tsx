import FilterGoods from "./filterGoods"
import ProductCard from "./productCard"
import {useEffect, useState} from "react";
import {IProduct} from "../../../../utils/interfaces/icommon.ts";
import {useFetchProductsQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";

export const filtersArray = ["Году выпуска", "Наименованию", "Цене"]

const Goods = () => {
    const {
        data: goods,
        isLoading,
        isFetching
    } = useFetchProductsQuery()
    const [sortedGoods, setSortedGoods] = useState<IProduct[]>([])
    const [selectedCategory, setCategory] = useState('Все товары')
    const [selectedFilter, setFilter] = useState('')

    useEffect(() => {
        if (!isLoading && !isFetching && (goods !== undefined)) {
            setSortedGoods(goods.slice())
        }
        if (goods !== undefined) {
            if (selectedCategory === "Все товары") {
                setSortedGoods(goods)
            } else {
                setSortedGoods(goods.filter((obj) => obj.category === selectedCategory))
            }

            let tmpArray = sortedGoods.slice();

            /*if (selectedFilter === "") {
                setSortedGoods(tmpArray.sort((a, b) => {
                    const firstStamp = Date.parse(a.stamp)
                    const secondStamp = Date.parse(b.stamp)
                    console.log(firstStamp)
                    console.log(secondStamp)
                    if (firstStamp === secondStamp) {
                        return 0
                    }
                    return secondStamp - firstStamp;
                }))
                console.log(tmpArray)
            } else */{
                switch (selectedFilter) {
                    case (filtersArray[0]):
                        setSortedGoods(tmpArray.sort((a, b) => {
                            const first = (new Date(a.creation_date).getFullYear())
                            const second = (new Date(b.creation_date).getFullYear())
                            const firstM = (new Date(a.creation_date).getMonth())
                            const secondM = (new Date(b.creation_date).getMonth())

                            if (first !== second) return first - second;
                            return firstM - secondM
                        }))
                        break;
                    case (filtersArray[1]):
                        setSortedGoods(tmpArray.sort((a, b) => {
                            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                                return -1;
                            }
                            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                                return 1;
                            }
                            return 0;
                        }))
                        break;
                    case (filtersArray[2]):
                        setSortedGoods(tmpArray.sort((a, b) => {
                            return a.price - b.price
                        }))
                        break;
                }
            }
        }
    }, [selectedCategory, goods, selectedFilter]);

    return (
        <div className="body-container pos-r">
            <FilterGoods onFilter={(v: string) => setFilter(v)} onCategory={(v: string) => setCategory(v)}/>
            <div className="catalog-grid">
                {goods !== undefined ? sortedGoods.map((product, index) => <ProductCard product={product}
                                                                                        key={index}/>) : null}
            </div>
        </div>
    )
}

export default Goods