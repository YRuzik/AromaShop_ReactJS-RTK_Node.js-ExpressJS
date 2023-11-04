import FilterGoods from "./filterGoods"
import ProductCard from "./productCard"

const Goods = () => {
    return (
        <div className="body-container pos-r">
            <FilterGoods/>
            <div className="catalog-grid">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    )
}

export default Goods