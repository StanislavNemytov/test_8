/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { React } from "react";
import { connect } from "react-redux";
import { getPage, sendNewTask, startLoading } from "../../store/requests";
import { selectorReducerApi } from "../../store/selectors/selector";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

/**
 * @param {Object} state
 * @param {Function} state.getPage
 * @param {Object} state.reducerAPI
 * @param {boolean} state.reducerAPI.loading
 * @param {number} state.reducerAPI.currentPage
 * @param {number} state.reducerAPI.total_task_count
 * @param {{id:number,username:string,text:string,email:string,status:number}} state.reducerAPI.tasks
 */
function NewTask({ sendNewTask, startLoading, getPage }) {
  const [form] = useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    startLoading();
    await sendNewTask(values);
    form.resetFields();
    getPage();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="task"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="text"
        label="Task"
        rules={[
          {
            required: true,
            message: "Please input your Task!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

/**
 * @param {Object} state
 * @param {Object} state.reducerAPI
 * @param {number} state.reducerAPI.currentPage
 * @param {number} state.reducerAPI.total_task_count
 * @param {{id:number,username:string,text:string,email:string,status:number}} state.reducerAPI.tasks
 */
const mapStateToProps = (state) => selectorReducerApi(state);

const mapDispatchToProps = {
  sendNewTask,
  startLoading,
  getPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
