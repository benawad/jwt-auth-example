import React, { useState } from "react";
import Layout from "../components/Layout";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../lib/accessToken";
import Router from "next/router";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <Layout>
      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log("form submitted");
          const response = await login({
            variables: {
              email,
              password
            },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }

              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user
                }
              });
            }
          });

          console.log(response);

          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }

          Router.push("/");
        }}
      >
        <div>
          <input
            value={email}
            placeholder="email"
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </Layout>
  );
};
