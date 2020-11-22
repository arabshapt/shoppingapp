import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  name: Scalars['String'];
  amount: Scalars['Int'];
  calories: Scalars['Int'];
  fat: Scalars['Int'];
  carbs: Scalars['Int'];
  protein: Scalars['Int'];
};

export type UpdateItem = {
  name?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  calories?: Maybe<Scalars['Int']>;
  fat?: Maybe<Scalars['Int']>;
  carbs?: Maybe<Scalars['Int']>;
  protein?: Maybe<Scalars['Int']>;
};

export type CreateItem = {
  name?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  calories?: Maybe<Scalars['Int']>;
  fat?: Maybe<Scalars['Int']>;
  carbs?: Maybe<Scalars['Int']>;
  protein?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  readItems?: Maybe<Array<Item>>;
  readItem?: Maybe<Item>;
};


export type QueryReadItemsArgs = {
  userId: Scalars['ID'];
};


export type QueryReadItemArgs = {
  userId: Scalars['ID'];
  itemId?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Array<Maybe<Item>>;
  updateItem: Array<Maybe<Item>>;
  deleteItem: Array<Maybe<Item>>;
};


export type MutationCreateItemArgs = {
  userId: Scalars['ID'];
  item: CreateItem;
};


export type MutationUpdateItemArgs = {
  userId: Scalars['ID'];
  id: Scalars['ID'];
  item: UpdateItem;
};


export type MutationDeleteItemArgs = {
  userId: Scalars['ID'];
  id: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateItemMutationVariables = Exact<{
  userId: Scalars['ID'];
  item: CreateItem;
}>;


export type CreateItemMutation = (
  { __typename?: 'Mutation' }
  & { createItem: Array<Maybe<(
    { __typename?: 'Item' }
    & Pick<Item, 'id'>
  )>> }
);

export type DeleteItemMutationVariables = Exact<{
  userId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type DeleteItemMutation = (
  { __typename?: 'Mutation' }
  & { deleteItem: Array<Maybe<(
    { __typename?: 'Item' }
    & Pick<Item, 'id'>
  )>> }
);

export type ReadItemsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ReadItemsQuery = (
  { __typename?: 'Query' }
  & { readItems?: Maybe<Array<(
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'name' | 'amount' | 'calories' | 'fat' | 'carbs' | 'protein'>
  )>> }
);

export type UpdateItemMutationVariables = Exact<{
  userId: Scalars['ID'];
  id: Scalars['ID'];
  item: UpdateItem;
}>;


export type UpdateItemMutation = (
  { __typename?: 'Mutation' }
  & { updateItem: Array<Maybe<(
    { __typename?: 'Item' }
    & Pick<Item, 'id'>
  )>> }
);


export const CreateItemDocument = gql`
    mutation createItem($userId: ID!, $item: CreateItem!) {
  createItem(userId: $userId, item: $item) {
    id
  }
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, baseOptions);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const DeleteItemDocument = gql`
    mutation deleteItem($userId: ID!, $id: ID!) {
  deleteItem(userId: $userId, id: $id) {
    id
  }
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, baseOptions);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const ReadItemsDocument = gql`
    query readItems($userId: ID!) {
  readItems(userId: $userId) {
    id
    name
    amount
    calories
    fat
    carbs
    protein
  }
}
    `;

/**
 * __useReadItemsQuery__
 *
 * To run a query within a React component, call `useReadItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadItemsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useReadItemsQuery(baseOptions: Apollo.QueryHookOptions<ReadItemsQuery, ReadItemsQueryVariables>) {
        return Apollo.useQuery<ReadItemsQuery, ReadItemsQueryVariables>(ReadItemsDocument, baseOptions);
      }
export function useReadItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReadItemsQuery, ReadItemsQueryVariables>) {
          return Apollo.useLazyQuery<ReadItemsQuery, ReadItemsQueryVariables>(ReadItemsDocument, baseOptions);
        }
export type ReadItemsQueryHookResult = ReturnType<typeof useReadItemsQuery>;
export type ReadItemsLazyQueryHookResult = ReturnType<typeof useReadItemsLazyQuery>;
export type ReadItemsQueryResult = Apollo.QueryResult<ReadItemsQuery, ReadItemsQueryVariables>;
export const UpdateItemDocument = gql`
    mutation updateItem($userId: ID!, $id: ID!, $item: UpdateItem!) {
  updateItem(userId: $userId, id: $id, item: $item) {
    id
  }
}
    `;
export type UpdateItemMutationFn = Apollo.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      id: // value for 'id'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        return Apollo.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, baseOptions);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;