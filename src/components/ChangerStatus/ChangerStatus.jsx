/* eslint-disable no-shadow */
import { Button } from "antd";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {
  checkTokenValidation,
  needAuthorization,
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
  needAuthorization,
  needAuthorizationAction,
}) {
  const changeStatus = () => {
    checkTokenValidation();
    const newStatus = String(task.status).split("");
    newStatus[newStatus.length - 1] = +newStatus[newStatus.length - 1] ? 0 : 1;
    const newTask = { ...task, status: Number(newStatus.join("")) };
    startLoading();
    updateTask(newTask);
  };

  useEffect(() => {
    if (needAuthorization) {
      needAuthorizationAction();
    }
  }, [needAuthorization]);

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
  needAuthorizationAction: needAuthorization,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangerStatus);
