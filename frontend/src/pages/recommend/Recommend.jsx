import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';
import { PreviewFilm } from "../../components/PreviewFilm/PreviewFilm";
import styles from './recommend.module.scss';

function Recommend() {
  const {genre} = useParams();
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchRecommendedFilm = async () => {
    try {
      const response = await fetch(`http://localhost:8006/recommend_film?genre=${genre.toLocaleLowerCase()}`);
      if (!response.ok) {
        throw new Error('response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setIsLoading(false);
      setFilm(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  useEffect(() => { 
    searchRecommendedFilm();
  } 
  , []);
  if (isLoading) {
    return <div>Loading...</div>;
}
  return (
    <div className={styles.container}>
      <div className={styles.title}>Recommend Movie</div>
      <div className="film-list">
        {film.map((film) => (
          <div key={film.id} className={styles.film}>
            <PreviewFilm film={film}/>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Recommend;