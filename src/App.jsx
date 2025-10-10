import React from "react";
import Layout from "./layouts/Layout";
import TodoList from "./components/TodoList";
const App = () => {
  return (
    <Layout>
      <TodoList />
    </Layout>
  );
};

export default App;
