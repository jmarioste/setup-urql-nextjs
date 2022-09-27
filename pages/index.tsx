import type { NextPage } from "next";
import { useEpisodesQuery } from "../graphql/episodes.gql";
import { useLoadEpisodes } from "../hooks/useLoadEpisodes";

const Home: NextPage = () => {
  const { items, hasNext, loadMore, fetching } = useLoadEpisodes();

  const episodes = items;
  return (
    <div className="container">
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
      {fetching && <p>Loading...</p>}
      {!fetching && hasNext && (
        <button className="load-more" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Home;
