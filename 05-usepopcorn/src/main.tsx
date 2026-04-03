import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import StarRating from './StarRating.tsx';

export function Test(){
  const [movieRating, setMovieRating] = useState(0);
  return <div>
    <StarRating color='blue' maxStar={10} onSetRating={setMovieRating}/>
    <p>this movie is {movieRating} rated</p>
  </div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StarRating />
    <StarRating maxStar={10} color='red' size={25}/>
    <StarRating message={["Terrible", "Bad", "Okay", "Good", "Excellent"]} defaultRating={3} />
    <Test />
  </StrictMode>,
)
