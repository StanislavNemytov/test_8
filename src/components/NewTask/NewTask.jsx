/* eslint-disable no-console */
import { Button, Col, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
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

function NewTask({ sendNewTask, startLoading, getPage, reducerAPI }) {
  const { params } = reducerAPI;
  const [form] = useForm();

  const openNotification = (text) => {
    notification.open({
      message: "Task was added!",
      description: <Text>{text}</Text>,
      placement: "bottomRight",
    });
  };

  const onFinish = async (values) => {
    startLoading();
    sendNewTask(values);
    form.resetFields();
    openNotification(values.text);
    getPage(params);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row>
        <Col
          sm={{
            offset: 4,
          }}
        >
          <Title level={4}>Create a new task</Title>
        </Col>
      </Row>
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
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Form.Item wrapperCol={{ sm: { offset: 4, span: 16 } }}>
          <Button
            style={{ marginLeft: "auto", display: "block" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => selectorReducerApi(state);

const mapDispatchToProps = {
  sendNewTask,
  startLoading,
  getPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
