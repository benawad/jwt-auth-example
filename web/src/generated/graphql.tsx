import {
  gql,
  QueryResult,
  MutationFunction,
  BaseMutationOptions,
  MutationResult,
  QueryHookOptions,
  LazyQueryHookOptions,
  useQuery,
  useLazyQuery,
  useMutation,
  MutationHookOptions,
} from "@apollo/client";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  logout: Scalars["Boolean"];
  revokeRefreshTokensForUser: Scalars["Boolean"];
  login: User;
  register: Scalars["Boolean"];
};

export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars["Int"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationRegisterArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  bye: Scalars["String"];
  users: Array<User>;
  me?: Maybe<User>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  email: Scalars["String"];
};
export type ByeQueryVariables = {};

export type ByeQuery = { __typename?: "Query" } & Pick<Query, "bye">;

export type HelloQueryVariables = {};

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & Pick<User, "id" | "email">;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">>;
};

export type RegisterMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RegisterMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "register"
>;

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<User, "id" | "email">>;
};

export const ByeDocument = gql`
  query Bye {
    bye
  }
`;

export function useByeQuery(
  baseOptions?: QueryHookOptions<ByeQuery, ByeQueryVariables>
) {
  return useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
}
export function useByeLazyQuery(
  baseOptions?: LazyQueryHookOptions<ByeQuery, ByeQueryVariables>
) {
  return useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
}

export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeQueryResult = QueryResult<ByeQuery, ByeQueryVariables>;
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;

export function useHelloQuery(
  baseOptions?: QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
}
export function useHelloLazyQuery(
  baseOptions?: LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}

export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloQueryResult = QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;
export type LoginMutationFn = MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

export function useLoginMutation(
  baseOptions?: MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  return useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = MutationResult<LoginMutation>;
export type LoginMutationOptions = BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

export function useLogoutMutation(
  baseOptions?: MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  return useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = MutationResult<LogoutMutation>;
export type LogoutMutationOptions = BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

export function useMeQuery(
  baseOptions?: QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}

export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;
export type RegisterMutationFn = MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

export function useRegisterMutation(
  baseOptions?: MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
  return useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = MutationResult<RegisterMutation>;
export type RegisterMutationOptions = BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      email
    }
  }
`;

export function useUsersQuery(
  baseOptions?: QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export function useUsersLazyQuery(
  baseOptions?: LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}

export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersQueryResult = QueryResult<UsersQuery, UsersQueryVariables>;
