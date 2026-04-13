import { useState, useEffect } from "react";
const KEY = "39897733";
export function useMovies(query: string){
     const [movies, setMovies] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [error , setError] = useState("");

    useEffect(function(){
        // callBack?.();
      const controller = new AbortController();
      async function fetchMovies(){
      setIsLoading(true);
      setError("");
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
      try{
        if(!res.ok) throw new Error("something went wrong with fetching movies");
        const data = await res.json();
        if(data.Response === "False") throw new Error("Movie not Found");
        setMovies(data.Search);
        setError("");
      }catch(err: unknown){
        if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      } else {
        console.log("Unknown error");
        setError("Something went wrong");
      }
      }finally{
        setIsLoading(false)
      }
     }
     if(query.length < 3){
      setError("");
      setMovies([]);
      return;
     }
    
    //  handleCloseMovie();
     fetchMovies();
    
     return function () {
        controller.abort();
      };
    }, [query]);

    return {error, isLoading, movies}
}