import { useEffect, useState } from "react";
import { useEpisodesQuery } from "../graphql/episodes.gql";
import { Episode } from "../graphql/types";

export const useLoadEpisodes = () => {
  const [items, setItems] = useState<Partial<Episode | null>[]>([]);
  const [page, setPage] = useState(1);
  const [{ data, fetching }] = useEpisodesQuery({
    variables: {
      page: page,
    },
  });

  const episodes = data?.episodes?.results ?? [];

  useEffect(() => {
    setItems(items.concat(episodes));
  }, [episodes]);

  const next = data?.episodes?.info?.next;

  const loadMore = () => {
    if (next) {
      setPage(next!);
    }
  };

  return {
    items,
    hasNext: Boolean(next),
    loadMore,
    fetching,
  };
};
