import { useEffect, useState } from "react";
import { useEpisodesQuery } from "../graphql/episodes.gql";
import { Episode } from "../graphql/types";

export const useLoadEpisodes = () => {
  const [items, setItems] = useState<Partial<Episode | null>[]>([]);

  const [page, setPage] = useState(1);

  const [{ data, fetching }] = useEpisodesQuery({
    variables: {},
  });

  const episodes = data?.episodes?.results ?? [];

  //this is the important part, whenever the episodes changes, we concatenate it to the previous list
  useEffect(() => {
    setItems(items.concat(episodes));
  }, [episodes]);

  const next = data?.episodes?.info?.next;

  //when load more is called, we modify the page so that it triggers another query to the backend.
  const loadMore = () => {
    if (next) {
      setPage(next!);
    }
  };

  //return the important items for our interface
  return {
    items,
    hasNext: Boolean(next),
    loadMore,
    fetching,
  };
};
