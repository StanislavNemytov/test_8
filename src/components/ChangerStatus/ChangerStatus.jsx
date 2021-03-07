/* eslint-disable no-shadow */
import { Button } from "antd";
import React, { useMemo } from "react";
import { connect } from "react-redux";
import { startLoading, updateTask } from "../../store/requests";
import { selectorReducerApi } from "../../store/selectors/selector";

function ChangerStatus({ task, startLoading, updateTask }) {
  const changeStatus = (task) => {
    const newStatus = String(task.status).split("");
    newStatus[newStatus.length - 1] = +newStatus[newStatus.length - 1] ? 0 : 1;
    const newTask = { ...task, status: Number(newStatus.join("")) };
    startLoading();
    updateTask(newTask);
  };

  const text = useMemo(() => (
    <>{task.status % 10 ? "Incomplete" : "Complete"}</>
  ));

  return (
    <Button type="default" onClick={() => changeStatus(task)}>
      {text}
    </Button>
  );
}

const mapStateToProps = (state) => ({
  ...selectorReducerApi(state),
});

const mapDispatchToProps = {
  updateTask,
  startLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangerStatus);
