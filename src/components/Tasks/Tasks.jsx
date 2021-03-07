/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { Table } from "antd";
import { React, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getPage, startLoading, updateTask } from "../../store/requests";
import {
  selectorReducerApi,
  selectorReducerAuthorization,
} from "../../store/selectors/selector";
import TableTag from "../TableTag/TableTag";
import TaskText from "../Task/TaskText";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: () => {},
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    sorter: () => {},
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: () => {},
  },
  {
    title: "Text",
    dataIndex: "text",
    key: "text",
    width: "30%",
    editable: true,
    sorter: () => {},
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "48px",
    sorter: () => {},
    render: (statusNumber) => <TableTag statusNumber={statusNumber} />,
  },
];

/**
 * @param {Object} state
 * @param {Function} state.getPage
 * @param {Object} state.reducerAPI
 * @param {boolean} state.reducerAPI.loading
 * @param {number} state.reducerAPI.currentPage
 * @param {number} state.reducerAPI.total_task_count
 * @param {[{id:number,username:string,text:string,email:string,status:number}]} state.reducerAPI.tasks
 */
function Tasks({
  reducerAPI,
  getPage,
  updateTask,
  startLoading,
  reducerAuthorization,
}) {
  const { loading, tasks, total_task_count, currentPage } = reducerAPI;
  const { expired } = reducerAuthorization;
  useEffect(() => {
    getPage();
  }, []);

  function createDataSource(tasks) {
    let tableData;
    if (tasks && tasks.length) {
      tableData = tasks.map((task) => ({
        ...task,
        dataIndex: task.id,
        key: `${task.id}${task.username}`,
      }));
    }
    return tableData;
  }

  const tableData = useMemo(() => createDataSource(tasks), [tasks]);

  const handleTableChange = (pagination, filters, sorter) => {
    const { current } = pagination;
    if (current !== currentPage) {
      startLoading();
      getPage(current);
    }
    console.log(
      "pagination:",
      pagination,
      "\nfilters:",
      filters,
      "\nsorter:",
      sorter
    );
  };

  const components = {
    body: { cell: TaskText },
  };

  const handleSave = (updatedTask) => {
    startLoading();
    updateTask(updatedTask);
  };

  const newColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: expired ? col.editable : false,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Table
      loading={loading}
      columns={newColumns}
      onChange={handleTableChange}
      dataSource={tableData}
      components={components}
      pagination={{
        pageSize: 3,
        hideOnSinglePage: true,
        defaultCurrent: currentPage,
        total: total_task_count,
      }}
      rowClassName={() => "editable-row"}
      bordered="true"
    />
  );
}

/**
 * @param {Object} state
 * @param {Object} state.reducerAPI
 * @param {number} state.reducerAPI.currentPage
 * @param {number} state.reducerAPI.total_task_count
 * @param {{id:number,username:string,text:string,email:string,status:number}} state.reducerAPI.tasks
 */
const mapStateToProps = (state) => ({
  ...selectorReducerApi(state),
  ...selectorReducerAuthorization(state),
});

const mapDispatchToProps = {
  getPage,
  updateTask,
  startLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
