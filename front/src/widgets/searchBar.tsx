import {Labels} from "../labels"
import {useFetchProductsQuery} from "../utils/redux/features/common/commonApiSlice.ts";
import {FC, useEffect, useRef, useState} from "react";
import {IProduct} from "../utils/interfaces/icommon.ts";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    const [isOpen, setOpen] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [filteredProducts, setProducts] = useState<IProduct[]>([])
    const {data: products} = useFetchProductsQuery()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (products !== undefined) {
            if (searchText.length >= 3) {
                setProducts(products.slice().filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase())))
            } else {
                setProducts([])
            }
        }
    }, [searchText, products]);

    useEffect(() => {
        if (isOpen) {
            const checkOutside = (e: any) => {
                if (e.target?.contains(ref.current) && e.target !== ref.current) {
                    setOpen(false)
                }
            }
            document.addEventListener('click', checkOutside);
            return () => {
                document.removeEventListener('click', checkOutside)
            }
        }
    }, [isOpen]);

    return (
        <div className="w-25 pos-r" ref={ref}>
            <input className="search-bar" placeholder={Labels.search} onClick={() => {
                setOpen(true)
            }} onChange={(e) => {
                setSearchText(e.currentTarget.value)
            }}/>
            {(filteredProducts.length > 0) && isOpen ? <div className={"search-result-box"}>
                {filteredProducts.map((product, index) => <SearchEntity key={index} {...product}/>)}
            </div> : null}
        </div>
    )
}

const SearchEntity: FC<IProduct> = ({title, price, category, product_id}) => {
    const navigate = useNavigate()
    return (
        <div className={"w-100 flexbox-sb-c admin-order-entity pl-5 pr-5"} onClick={() => {
            navigate(`/catalog/${product_id}`)
        }}>
            <div>
                {title} - <span>{category}</span>
            </div>
            <div>
                {price} руб.
            </div>
        </div>
    )
}

export default SearchBar