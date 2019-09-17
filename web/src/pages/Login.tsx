import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

interface Props {}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        console.log("form submitted");
        const response = await login({
          variables: {
            email,
            password
          }
        });

        console.log(response);

        if (response && response.data) {
          setAccessToken(response.data.login.accessToken);
        }

        history.push("/");
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
  );
};
