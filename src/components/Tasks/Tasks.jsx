/* eslint-disable camelcase */
import { Table } from "antd";
import { React, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getPage, startLoading, updateTask } from "../../store/requests";
import {
  selectorReducerApi,
  selectorReducerAuthorization,
} from "../../store/selectors/selector";
import ChangerStatus from "../ChangerStatus/ChangerStatus";
import TableTag from "../TableTag/TableTag";
import TaskText from "../Task/TaskText";

function Tasks({
  reducerAPI,
  getPage,
  updateTask,
  startLoading,
  reducerAuthorization,
}) {
  const {
    loading,
    tasks,
    total_task_count,
    currentPage,
    sortDirection,
    params,
    sortDirectionDefault,
  } = reducerAPI;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "max-content",
      sorter: () => {},
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "max-content",
      sorter: () => {},
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "max-content",
      sorter: () => {},
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
      editable: true,
      sorter: () => {},
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "max-content",
      sorter: () => {},
      render: (statusNumber) => <TableTag statusNumber={statusNumber} />,
    },
  ];
  const { expired } = reducerAuthorization;
  useEffect(() => {
    getPage(params);
  }, []);

  function createDataSource(tasks) {
    let tableData = [];
    if (tasks.length) {
      tableData = tasks.map((task) => ({
        ...task,
        dataIndex: task.id,
        key: `${task.id}${task.username}`,
      }));
    }
    return tableData;
  }

  const tableData = useMemo(() => createDataSource(tasks), [tasks]);

  const changeTablePage = (current) => {
    if (current && current !== params.page) {
      getPage({ ...params, page: current });
      return true;
    }
    return false;
  };

  const changeSortParams = (field, order) => {
    if (
      field &&
      (field !== params.sort_field ||
        sortDirection[order] !== params.sort_direction)
    ) {
      const sort = {
        sort_direction: sortDirection[order] || sortDirectionDefault,
        sort_field: order ? field : "",
      };
      getPage({ ...params, ...sort });
    }
  };

  const onChange = ({ current, field, order }) => {
    startLoading();
    if (!changeTablePage(current)) {
      changeSortParams(field, order);
    }
  };

  const components = {
    body: { cell: TaskText },
  };

  const saveUpdates = (updatedTask) => {
    startLoading();
    updateTask(updatedTask);
  };

  const generateColumnsDataForAntDesign = (expired) => {
    if (expired) {
      columns.push({
        title: "Completed",
        dataIndex: "status",
        key: "status-action",
        width: "max-content",
        render: (_, task) => <ChangerStatus task={task} />,
      });
    }

    return columns.map((col) => {
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
          saveUpdates,
        }),
      };
    });
  };

  const newColumns = useMemo(() => generateColumnsDataForAntDesign(expired), [
    expired,
  ]);

  return (
    <Table
      loading={loading}
      columns={newColumns}
      onChange={(pagination, filters, sorter) =>
        onChange({ ...pagination, ...filters, ...sorter })
      }
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
      scroll={{ x: 950 }}
    />
  );
}

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
