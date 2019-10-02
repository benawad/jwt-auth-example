import React from "react";
import { useByeQuery } from "../generated/graphql";
import Layout from "../components/Layout";

export default () => {
  const { data, loading, error } = useByeQuery();

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Layout>
        <div>err</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div>no data</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>{data.bye}</div>
    </Layout>
  );
};
