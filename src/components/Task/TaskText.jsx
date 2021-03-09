/* eslint-disable no-console */
import { Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  checkTokenValidation,
  endEditing,
  needAuthorization,
  setCurrentEditingTask,
} from "../../store/requests";
import { selectorReducerText } from "../../store/selectors/selector";
import "./TaskText.less";

const TaskText = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  saveUpdates,
  reducerText,
  setCurrentEditingTask,
  endEditing,
  needAuthorization,
  needAuthorizationAction,
  checkTokenValidation,
  ...restProps
}) => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const { editing, text, id } = reducerText;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      form.setFieldsValue({
        text: record.text,
      });
    }
  }, [editing, inputRef.current]);

  const startEditing = () => {
    checkTokenValidation();
    if (!needAuthorization) {
      if (record.id !== id) {
        setCurrentEditingTask(record);
      }
    }
  };

  useEffect(() => {
    if (needAuthorization) {
      needAuthorizationAction();
    }
  }, [needAuthorization]);

  const save = async () => {
    try {
      const values = await form.validateFields();
      endEditing();
      if (values.text.trim() !== text) {
        const { status } = record;
        let newStatus = +status;
        if (status < 10) {
          newStatus += 10;
        }
        saveUpdates({ ...record, ...values, status: newStatus });
      }
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const cancelEditing = () => {
    endEditing();
  };

  let childNode = children;

  if (editable) {
    childNode =
      editing && record.id === id ? (
        <Form form={form} onFinish={save}>
          <Form.Item
            style={{
              margin: 4,
            }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <TextArea ref={inputRef} autoSize={{ minRows: 1, maxRows: 4 }} />
          </Form.Item>
          <Form.Item
            style={{
              margin: 0,
            }}
          >
            <Button
              size="small"
              type="ghost"
              style={{ marginRight: 8 }}
              onClick={cancelEditing}
            >
              Cancel
            </Button>
            <Button size="small" type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={startEditing}
          onKeyPress={startEditing}
          role="button"
          tabIndex="0"
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};

const mapStateToProps = (state) => selectorReducerText(state);

const mapDispatchToProps = {
  setCurrentEditingTask,
  endEditing,
  checkTokenValidation,
  needAuthorizationAction: needAuthorization,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskText);
