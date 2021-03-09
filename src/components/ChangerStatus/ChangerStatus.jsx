import { Button } from "antd";
import React, { useMemo } from "react";
import { connect } from "react-redux";
import {
  checkTokenValidation,
  startLoading,
  updateTask,
} from "../../store/requests";
import {
  selectorReducerApi,
  selectorReducerAuthorization,
} from "../../store/selectors/selector";

function ChangerStatus({
  task,
  startLoading,
  updateTask,
  checkTokenValidation,
  reducerAuthorization,
}) {
  const { needAuthorization } = reducerAuthorization;
  const changeStatus = () => {
    checkTokenValidation();
    if (!needAuthorization) {
      const newStatus = String(task.status).split("");
      newStatus[newStatus.length - 1] = +newStatus[newStatus.length - 1]
        ? 0
        : 1;
      const newTask = { ...task, status: Number(newStatus.join("")) };
      startLoading();
      updateTask(newTask);
    }
  };

  const text = useMemo(() => (
    <>{task.status % 10 ? "Incomplete" : "Complete"}</>
  ));

  return (
    <Button type="default" onClick={changeStatus}>
      {text}
    </Button>
  );
}

const mapStateToProps = (state) => ({
  ...selectorReducerApi(state),
  ...selectorReducerAuthorization(state),
});

const mapDispatchToProps = {
  updateTask,
  startLoading,
  checkTokenValidation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangerStatus);
