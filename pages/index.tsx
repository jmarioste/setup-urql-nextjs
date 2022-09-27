import type { NextPage } from "next";
import { useLoadEpisodes } from "../hooks/useLoadEpisodes";

const Home: NextPage = () => {
  //use the custom hook instead of the generated hook
  const { items, hasNext, loadMore, fetching } = useLoadEpisodes();

  const episodes = items;
  return (
    <div className="container">
      {/* this stays the same */}
      <ol className="episode-list">
        {episodes?.map((episode, i) => {
          return (
            <li key={i} className="episode">
              <h2 className="episode-title">{episode?.name}</h2>
              <p className="episode-ep">{episode?.episode}</p>
              <time dateTime={episode?.air_date ?? ""}>
                {episode?.air_date}
              </time>
            </li>
          );
        })}
      </ol>
      {/* add loading indicator for when we are fetching data from the api */}
      {fetching && <p>Loading...</p>}
      {/* add a load more button and call loadMore when clicked */}
      {/* hide it there are not next pages */}
      {!fetching && hasNext && (
        <button className="load-more" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Home;
