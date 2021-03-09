import { Button, Form, Input, Modal, PageHeader } from "antd";
import { Header } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import { React, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import {
  changeModalVisibility,
  login,
  logout,
  needAuthorization,
  startLoading,
} from "../../store/requests";
import { selectorReducerAuthorization } from "../../store/selectors/selector";
import "./CustomHeader.less";

function CustomHeader({
  startLoading,
  login,
  reducerAuthorization,
  logout,
  changeModalVisibility,
  needAuthorizationAction,
}) {
  const {
    expired,
    message,
    modalIsVisible,
    needAuthorization,
  } = reducerAuthorization;
  const formRef = useRef(null);

  const [form] = Form.useForm();

  const openLoginModal = () => {
    changeModalVisibility();
  };

  const onLogout = () => {
    logout();
  };

  const modalCancel = () => {
    changeModalVisibility();
  };

  const onFinish = (values) => {
    startLoading();
    login(values);
  };

  useEffect(() => {
    if (modalIsVisible) {
      formRef.current.focus();
    }
  }, [modalIsVisible]);

  useEffect(() => {
    if (needAuthorization) {
      needAuthorizationAction();
      openLoginModal();
    }
  }, [needAuthorization]);

  useEffect(() => {
    if (expired && modalIsVisible) {
      form.resetFields();
      modalCancel();
    }
  }, [expired]);

  const extraButton = useMemo(
    () =>
      expired
        ? [
            <Text key="user" type="secondary">
              Admin
            </Text>,
            <Button key="2" type="ghost" onClick={onLogout}>
              Logout
            </Button>,
          ]
        : [
            <Button key="1" type="primary" onClick={openLoginModal}>
              Login
            </Button>,
          ],
    [expired]
  );

  const showError = useMemo(() => {
    if (message) {
      return (
        <Text type="danger" className="modal-error">
          {message.password || message}
        </Text>
      );
    }
    return null;
  }, [message]);

  return (
    <Header className="custom-header">
      <PageHeader title="Tasks" extra={extraButton} />
      <Modal
        title="Login"
        visible={modalIsVisible}
        onCancel={modalCancel}
        okButtonProps={{ hidden: true }}
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
            <Input ref={formRef} placeholder="Username" />
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
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
        {showError}
      </Modal>
    </Header>
  );
}

const mapStateToProps = (state) => selectorReducerAuthorization(state);

const mapDispatchToProps = {
  login,
  startLoading,
  logout,
  changeModalVisibility,
  needAuthorizationAction: needAuthorization,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
