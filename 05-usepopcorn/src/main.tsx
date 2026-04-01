import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import StarRating from './StarRating.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StarRating />
  </StrictMode>,
)
