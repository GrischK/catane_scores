import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Game = {
  __typename?: 'Game';
  date?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  picture?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  players: Array<User>;
  scores?: Maybe<Array<Score>>;
};

export type GameInput = {
  date?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  place?: InputMaybe<Scalars['String']>;
  players: Array<UserId>;
};

export type GameInputWithScore = {
  date?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  place?: InputMaybe<Scalars['String']>;
  playersData: Array<PlayerData>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  createGameWithScores: Game;
  createUser: User;
  deleteGame: Scalars['String'];
  deleteUser: Scalars['String'];
  updateUser: User;
};


export type MutationCreateGameArgs = {
  data: GameInput;
};


export type MutationCreateGameWithScoresArgs = {
  data: GameInputWithScore;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteGameArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['Int'];
};

export type PlayerData = {
  player: Scalars['Int'];
  score: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  games: Array<Game>;
  scores: Array<Score>;
  users: Array<User>;
  usersByIds?: Maybe<Array<User>>;
  usersByNames?: Maybe<Array<User>>;
};


export type QueryUsersByIdsArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryUsersByNamesArgs = {
  names: Array<Scalars['String']>;
};

export type Score = {
  __typename?: 'Score';
  game: Game;
  id: Scalars['Int'];
  player: User;
  score: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  games?: Maybe<Array<Game>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  scores?: Maybe<Array<Score>>;
};

export type UserId = {
  id: Scalars['Float'];
};

export type UserInput = {
  name: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
};

export type CreateGameMutationVariables = Exact<{
  data: GameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', date?: string | null, id: number, place?: string | null, players: Array<{ __typename?: 'User', id: number, name: string }> } };

export type CreateGameWithScoresMutationVariables = Exact<{
  data: GameInputWithScore;
}>;


export type CreateGameWithScoresMutation = { __typename?: 'Mutation', createGameWithScores: { __typename?: 'Game', id: number, date?: string | null, place?: string | null, picture?: string | null, scores?: Array<{ __typename?: 'Score', score: number, player: { __typename?: 'User', name: string } }> | null } };

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, name: string, picture?: string | null } };

export type DeleteGameMutationVariables = Exact<{
  deleteGameId: Scalars['Int'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame: string };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: number, date?: string | null, picture?: string | null, place?: string | null, scores?: Array<{ __typename?: 'Score', score: number, player: { __typename?: 'User', id: number, name: string, picture?: string | null } }> | null }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, name: string, picture?: string | null, games?: Array<{ __typename?: 'Game', id: number }> | null }> };

export type UsersByIdsQueryVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type UsersByIdsQuery = { __typename?: 'Query', usersByIds?: Array<{ __typename?: 'User', id: number, name: string, picture?: string | null }> | null };

export type UsersByNamesQueryVariables = Exact<{
  names: Array<Scalars['String']> | Scalars['String'];
}>;


export type UsersByNamesQuery = { __typename?: 'Query', usersByNames?: Array<{ __typename?: 'User', id: number, name: string, picture?: string | null }> | null };

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['Int'];
  data: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, picture?: string | null, name: string, games?: Array<{ __typename?: 'Game', id: number }> | null } };


export const CreateGameDocument = gql`
    mutation CreateGame($data: GameInput!) {
  createGame(data: $data) {
    date
    id
    place
    players {
      id
      name
    }
  }
}
    `;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CreateGameWithScoresDocument = gql`
    mutation CreateGameWithScores($data: GameInputWithScore!) {
  createGameWithScores(data: $data) {
    id
    date
    place
    picture
    scores {
      score
      player {
        name
      }
    }
  }
}
    `;
export type CreateGameWithScoresMutationFn = Apollo.MutationFunction<CreateGameWithScoresMutation, CreateGameWithScoresMutationVariables>;

/**
 * __useCreateGameWithScoresMutation__
 *
 * To run a mutation, you first call `useCreateGameWithScoresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameWithScoresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameWithScoresMutation, { data, loading, error }] = useCreateGameWithScoresMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGameWithScoresMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameWithScoresMutation, CreateGameWithScoresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameWithScoresMutation, CreateGameWithScoresMutationVariables>(CreateGameWithScoresDocument, options);
      }
export type CreateGameWithScoresMutationHookResult = ReturnType<typeof useCreateGameWithScoresMutation>;
export type CreateGameWithScoresMutationResult = Apollo.MutationResult<CreateGameWithScoresMutation>;
export type CreateGameWithScoresMutationOptions = Apollo.BaseMutationOptions<CreateGameWithScoresMutation, CreateGameWithScoresMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
    name
    picture
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteGameDocument = gql`
    mutation DeleteGame($deleteGameId: Int!) {
  deleteGame(id: $deleteGameId)
}
    `;
export type DeleteGameMutationFn = Apollo.MutationFunction<DeleteGameMutation, DeleteGameMutationVariables>;

/**
 * __useDeleteGameMutation__
 *
 * To run a mutation, you first call `useDeleteGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGameMutation, { data, loading, error }] = useDeleteGameMutation({
 *   variables: {
 *      deleteGameId: // value for 'deleteGameId'
 *   },
 * });
 */
export function useDeleteGameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGameMutation, DeleteGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGameMutation, DeleteGameMutationVariables>(DeleteGameDocument, options);
      }
export type DeleteGameMutationHookResult = ReturnType<typeof useDeleteGameMutation>;
export type DeleteGameMutationResult = Apollo.MutationResult<DeleteGameMutation>;
export type DeleteGameMutationOptions = Apollo.BaseMutationOptions<DeleteGameMutation, DeleteGameMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: Int!) {
  deleteUser(id: $deleteUserId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GamesDocument = gql`
    query Games {
  games {
    id
    date
    picture
    place
    scores {
      player {
        id
        name
        picture
      }
      score
    }
  }
}
    `;

/**
 * __useGamesQuery__
 *
 * To run a query within a React component, call `useGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGamesQuery(baseOptions?: Apollo.QueryHookOptions<GamesQuery, GamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
      }
export function useGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesQuery, GamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
        }
export type GamesQueryHookResult = ReturnType<typeof useGamesQuery>;
export type GamesLazyQueryHookResult = ReturnType<typeof useGamesLazyQuery>;
export type GamesQueryResult = Apollo.QueryResult<GamesQuery, GamesQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    picture
    games {
      id
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersByIdsDocument = gql`
    query UsersByIds($ids: [Int!]!) {
  usersByIds(ids: $ids) {
    id
    name
    picture
  }
}
    `;

/**
 * __useUsersByIdsQuery__
 *
 * To run a query within a React component, call `useUsersByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useUsersByIdsQuery(baseOptions: Apollo.QueryHookOptions<UsersByIdsQuery, UsersByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByIdsQuery, UsersByIdsQueryVariables>(UsersByIdsDocument, options);
      }
export function useUsersByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByIdsQuery, UsersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByIdsQuery, UsersByIdsQueryVariables>(UsersByIdsDocument, options);
        }
export type UsersByIdsQueryHookResult = ReturnType<typeof useUsersByIdsQuery>;
export type UsersByIdsLazyQueryHookResult = ReturnType<typeof useUsersByIdsLazyQuery>;
export type UsersByIdsQueryResult = Apollo.QueryResult<UsersByIdsQuery, UsersByIdsQueryVariables>;
export const UsersByNamesDocument = gql`
    query UsersByNames($names: [String!]!) {
  usersByNames(names: $names) {
    id
    name
    picture
  }
}
    `;

/**
 * __useUsersByNamesQuery__
 *
 * To run a query within a React component, call `useUsersByNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByNamesQuery({
 *   variables: {
 *      names: // value for 'names'
 *   },
 * });
 */
export function useUsersByNamesQuery(baseOptions: Apollo.QueryHookOptions<UsersByNamesQuery, UsersByNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByNamesQuery, UsersByNamesQueryVariables>(UsersByNamesDocument, options);
      }
export function useUsersByNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByNamesQuery, UsersByNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByNamesQuery, UsersByNamesQueryVariables>(UsersByNamesDocument, options);
        }
export type UsersByNamesQueryHookResult = ReturnType<typeof useUsersByNamesQuery>;
export type UsersByNamesLazyQueryHookResult = ReturnType<typeof useUsersByNamesLazyQuery>;
export type UsersByNamesQueryResult = Apollo.QueryResult<UsersByNamesQuery, UsersByNamesQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserId: Int!, $data: UserInput!) {
  updateUser(id: $updateUserId, data: $data) {
    id
    picture
    name
    games {
      id
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;