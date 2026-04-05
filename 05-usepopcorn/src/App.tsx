import { useEffect, useState } from "react";
import './App.css';
import StarRating from "./StarRating";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

type WatchedMovie = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: number; 
};

type Movie = {
  Title: string,
    Poster: string,
    Year: string,
    Runtime: string,
    imdbRating: string,
    Plot: string,
    Released: string,
    Actors: string,
    Director: string,
    Genre: string
}

type MovieList = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};


const average = (arr: number[]): number =>
  arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

const KEY = "39897733";

export default function App() {
 const [query, setQuery] = useState("                     ");
 const [movies, setMovies] = useState([]);
 const [watched, setWatched] = useState<WatchedMovie[]>([]); 
 const [isLoading, setIsLoading] = useState(false);
 const [error , setError] = useState("");
 const [selectedId, setSelectedId] = useState("tt0458339");

 function handleAddWatched(movie: WatchedMovie) {
  setWatched((watched) => [...watched, movie]);
}

useEffect(function(){
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

 handleCloseMovie();
 fetchMovies();

 return function () {
    controller.abort();
  };
}, [query]);

function handleCloseMovie(){
  setSelectedId("");
}


function handleSelectMovie(id : string){
  setSelectedId(() => selectedId !== id ? id : "" )
}

function handleDeleteWatched(id: string){
  setWatched(watched => watched.filter(movie => movie.imdbID !== id));
}

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies}/>
      </NavBar>
      <Main>
        <Box>
          {!isLoading && !error && <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}
          {isLoading && !error && <Loader />}
          {error && <ErrorMessage msg={error} />}
        </Box>
        <Box>
          { selectedId ? <MovieDetails selectedId={selectedId} handleCloseMovie={handleCloseMovie} handleAddWatched={handleAddWatched} watched={watched}/> :
          <>
          <WatchedSummary watched={watched}/>
          <WatchedMoviesList watched={watched} handleDeleteWatched={handleDeleteWatched} />
          </>
          }
        </Box>
      </Main>
    </>
  );
}



function MovieDetails({selectedId, handleCloseMovie, handleAddWatched, watched}: {selectedId: string, handleCloseMovie(): void, handleAddWatched(movie: WatchedMovie): void, watched: WatchedMovie[]}){
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  function handleAdd(){
  const newWatchedMovie = {
  imdbID: selectedId,
  title,
  year,
  poster,
  imdbRating: Number(imdbRating),
  runtime: Number(runtime.split(" ").at(0)),
  userRating: userRating, 
};

    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  }


  useEffect(function(){
    function callBack(e: KeyboardEvent){
      if(e.code === "Escape"){
        handleCloseMovie();
      }
    }

    document.addEventListener("keydown", callBack);

    return function(){
      document.removeEventListener("keydown", callBack);
    }

  }, [handleCloseMovie])

  useEffect(function(){
    async function getMovieDetails(){
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(function () {
  if (!movie?.Title) return;
  document.title = `Movie | ${movie.Title}`;

  return function(){
    document.title = "usePopcorn";
  }
}, [movie]);

  if (!movie) return <p>Loading...</p>;

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating: imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;     

  return <div className="details">
    {isLoading ? <Loader /> :
    <>
    <header>
    <button className="btn-back" onClick={handleCloseMovie}>&larr;</button>
    <img src={poster} alt={`poster of ${title}`} />
    <div className="details-overview">
      <h2>{title}</h2>
      <p>{released}  &bull; {runtime}</p>
      <p>{genre}</p>
      <p><span>⭐</span> {imdbRating} IMDb rating</p>
    </div>
    </header>
    <section>
      <div className="rating">
      {isWatched ? <p>You rated with movie {watchedUserRating} <span>🌟</span></p> : <>
      <StarRating maxStar={10} size={24} onSetRating={setUserRating} />
      {userRating ? <button className="btn-add" onClick={() => handleAdd()}>+ Add to list</button> : ""} 
      </> 
      }
      
      </div>
      <p>
        <em>{plot}</em>
      </p>
      <p>Starring {actors}</p>
      <p>Directed by {director}</p>
    </section>
    </>
    }
    </div>
}

function ErrorMessage({msg}: {msg: string}){
  return <p className="error">
    <span>⛔</span>{msg}
  </p>
}

function Loader(){
  return <p className="loader">Loading...</p>
}

function NavBar({children}: {children: React.ReactNode}){
  return <nav className="nav-bar">
    <Logo />
    {children}
    </nav>
}

function Logo(){
  return <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
}

function Search({query, setQuery}: {query: string, setQuery: React.Dispatch<React.SetStateAction<string>> }){
  
  return <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
}

function NumResult({movies}: {movies: WatchedMovie[]}){
  return <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
}

function Main({children}: {children: React.ReactNode}){
  return <main className="main">
    {children}
    </main>
}

function Box({children}: {children: React.ReactNode}){
  const [isOpen, setIsOpen] = useState(true);
  
  return <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && (
            children
          )}
        </div>
}

function MovieList({movies, handleSelectMovie}: {movies : MovieList[], handleSelectMovie(id: string): void }){
 
  return <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} handleSelectMovie={handleSelectMovie} />
              ))}
        </ul>
}

function Movie({movie, handleSelectMovie}: {movie : MovieList, handleSelectMovie(id: string): void}){
  return <li  key={movie.imdbID} onClick={() => handleSelectMovie(movie.imdbID)}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
      }


// function WatchedBox(){
//   const [watched, setWatched] = useState(tempWatchedData);  
//   const [isOpen2, setIsOpen2] = useState(true);

  
//   return <div className="box">
//           <button
//             className="btn-toggle"
//             onClick={() => setIsOpen2((open) => !open)}
//           >
//             {isOpen2 ? "–" : "+"}
//           </button>
//           {isOpen2 && (
//             <>
//               <WatchedSummary watched={watched}/>
//               <WatchedMoviesList watched={watched} />
//             </>
//           )}
//         </div>
// }


function WatchedSummary({watched}: {watched: WatchedMovie[]}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
}

function WatchedMoviesList({watched, handleDeleteWatched}: {watched: WatchedMovie[], handleDeleteWatched(id: string): void }){
  return <ul className="list">
                {watched.map((movie) => (
                  <WatchedMovie movie={movie} key={movie.imdbID} handleDeleteWatched={handleDeleteWatched} />
                ))}
        </ul>
}



function WatchedMovie({movie, handleDeleteWatched}: {movie: WatchedMovie, handleDeleteWatched(id: string): void}){
  return <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                    </div>
                    <button className="btn-delete" onClick={() => handleDeleteWatched(movie.imdbID)}>X</button>
                  </li>
}