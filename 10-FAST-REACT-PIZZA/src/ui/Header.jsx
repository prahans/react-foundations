import { Link } from "react-router-dom"
import SearchOrder from "./SearchOrder"
function Header() {
    return (
        <header>
            <Link to="/">Fast React PIzza Co.</Link>
            <SearchOrder />
            <p>Prahans</p>
        </header>
    )
}

export default Header
