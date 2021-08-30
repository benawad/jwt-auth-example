import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useMeQuery, useLogoutMutation } from "./generated/graphql";
import { setAccessToken } from "./accessToken";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.me) setIsLoggedIn(true);
  }, [data]);

  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/bye">bye</Link>
      </div>
      <div>
        {!loading && isLoggedIn ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken("");
              await client.clearStore();
              setIsLoggedIn(false);
            }}
          >
            logout
          </button>
        ) : null}
      </div>
      {loading ? null : (isLoggedIn ? <div>you are logged in as: {data!.me!.email}</div> : <div>not logged in</div> )}
    </header>
  );
};
