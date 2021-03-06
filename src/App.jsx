/* eslint-disable no-shadow */
import { Layout } from "antd";
import React from "react";
import "./App.less";
import CustomHeader from "./components/CustomHeader/CustomHeader";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";

const { Content } = Layout;

export default function App() {
  return (
    <Layout>
      <CustomHeader />
      <Content style={{ padding: 20 }}>
        <Tasks />
        <NewTask />
      </Content>
    </Layout>
  );
}
