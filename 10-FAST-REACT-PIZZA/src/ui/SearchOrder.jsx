import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

function SearchOrder() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    function handleSubmit(e){
        if(!query) return;
        e.preventDefault();
        navigate(`/order/${query}`);
        setQuery("");
    }

    return <form onSubmit={handleSubmit}>
        <input placeholder="Serach order #" value={query} onChange={e => setQuery(e.target.value)} />
    </form>
}

export default SearchOrder
