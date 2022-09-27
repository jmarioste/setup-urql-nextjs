import { useEffect, useState } from "react";
import { EpisodesQuery, useEpisodesQuery } from "../graphql/episodes.gql";
import { Episode } from "../graphql/types";

export const useLoadEpisodes = () => {
  const [items, setItems] = useState<Partial<Episode | null>[]>([]);
  const [page, setPage] = useState(1);
  const [{ data, fetching }, fetchMore] = useEpisodesQuery({
    variables: {
      page: page,
    },
    pause: page > 1,
  });

  const episodes = data?.episodes?.results ?? [];

  useEffect(() => {
    setItems([...items, ...episodes]);
  }, [episodes]);

  useEffect(() => {
    fetchMore();
  }, [page]);

  const next = data?.episodes?.info?.next;

  const loadMore = () => {
    if (next) {
      setPage(next!);
    }
  };

  return {
    items,
    hasNext: !!next,
    loadMore,
    fetching,
  };
};
