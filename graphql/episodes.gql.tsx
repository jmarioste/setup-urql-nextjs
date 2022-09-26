import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EpisodesQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type EpisodesQuery = { __typename?: 'Query', episodes?: { __typename?: 'Episodes', results?: Array<{ __typename?: 'Episode', air_date?: string | null, created?: string | null, episode?: string | null, name?: string | null } | null> | null } | null };


export const EpisodesDocument = gql`
    query Episodes($page: Int) {
  episodes(page: $page) {
    results {
      air_date
      created
      episode
      name
    }
  }
}
    `;

export function useEpisodesQuery(options?: Omit<Urql.UseQueryArgs<EpisodesQueryVariables>, 'query'>) {
  return Urql.useQuery<EpisodesQuery, EpisodesQueryVariables>({ query: EpisodesDocument, ...options });
};