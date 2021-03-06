/* eslint-disable no-shadow */
/* eslint-disable no-console */
import { Button, Form, Input, Modal, PageHeader } from "antd";
import { Header } from "antd/lib/layout/layout";
import { React, useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { login, startLoading } from "../../store/requests";
import { selectorReducerAuthorization } from "../../store/selectors/selector";
import "./CustomHeader.less";

function CustomHeader({ startLoading, login, reducerAuthorization }) {
  const { status, expired } = reducerAuthorization;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openLoginModal = () => {
    setIsModalVisible(true);
  };

  const logout = () => {
    console.log("Logout");
  };

  const modalOk = () => {
    setIsModalVisible(false);
  };

  const modalCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    startLoading();
    login(values);
  };

  useEffect(() => {
    if (status === "ok") {
      modalCancel();
    }
  }, [status]);

  const extraButton = useMemo(() => {
    if (expired) {
      return (
        <Button key="2" type="ghost" onClick={logout}>
          Logout
        </Button>
      );
    }
    return (
      <Button key="1" type="primary" onClick={openLoginModal}>
        Login
      </Button>
    );
  }, [expired]);

  return (
    <Header className="custom-header">
      <PageHeader title="Tasks" extra={[extraButton]} />
      <Modal
        title="Login"
        visible={isModalVisible}
        onOk={modalOk}
        onCancel={modalCancel}
      >
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
}

const mapStateToProps = (state) => selectorReducerAuthorization(state);

const mapDispatchToProps = {
  login,
  startLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
