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
};

export type GameInput = {
  date?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  place?: InputMaybe<Scalars['String']>;
  players: Array<UserId>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  createUser: User;
  deleteUser: Scalars['String'];
};


export type MutationCreateGameArgs = {
  data: GameInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  games: Array<Game>;
  users: Array<User>;
  usersByNames?: Maybe<Array<User>>;
};


export type QueryUsersByNamesArgs = {
  names: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  games?: Maybe<Array<Game>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
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

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, name: string, picture?: string | null } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: number, date?: string | null, picture?: string | null, place?: string | null, players: Array<{ __typename?: 'User', id: number, name: string, picture?: string | null }> }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, name: string, picture?: string | null, games?: Array<{ __typename?: 'Game', id: number }> | null }> };

export type UsersByNamesQueryVariables = Exact<{
  names: Array<Scalars['String']> | Scalars['String'];
}>;


export type UsersByNamesQuery = { __typename?: 'Query', usersByNames?: Array<{ __typename?: 'User', id: number, name: string, picture?: string | null }> | null };


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
    players {
      id
      name
      picture
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