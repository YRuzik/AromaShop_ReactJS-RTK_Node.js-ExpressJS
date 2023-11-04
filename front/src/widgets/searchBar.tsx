import { Labels } from "../labels"

const SearchBar = () => {
    return (
        <div className="w-25">
            <input className="search-bar" placeholder={Labels.search}/>
        </div>
    )
}

export default SearchBar