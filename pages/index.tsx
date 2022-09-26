import type { NextPage } from "next";
import { useEpisodesQuery } from "../graphql/episodes.gql";

const Home: NextPage = () => {
  const [{ data }] = useEpisodesQuery({
    variables: {
      page: 1,
    },
  });

  const episodes = data?.episodes?.results;
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
    </div>
  );
};

export default Home;
