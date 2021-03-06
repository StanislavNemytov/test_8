/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { Form, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { endEditing, setCurrentEditingTask } from "../../store/requests";
import { selectorReducerText } from "../../store/selectors/selector";
import "./TaskText.less";

const TaskText = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  reducerText,
  setCurrentEditingTask,
  endEditing,
  ...restProps
}) => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const { editing, text, id } = reducerText;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing, inputRef.current]);

  const startEditing = async () => {
    if (record.id !== id) {
      await setCurrentEditingTask(record);
    }
    form.setFieldsValue({
      text: record.text,
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      endEditing();
      if (values.text.trim() !== text) {
        const { status } = record;
        let newStatus = Number(status);
        if (status < 10) {
          newStatus += 10;
        }
        handleSave({ ...record, ...values, status: newStatus });
      }
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode =
      editing && record.id === id ? (
        <Form form={form} onFinish={save}>
          <Form.Item
            style={{
              margin: 0,
            }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <Input ref={inputRef} onFocus={startEditing} />
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

/**
 * @param {Object} state
 * @param {Object} state.reducerAPI
 * @param {number} state.reducerAPI.currentPage
 * @param {number} state.reducerAPI.total_task_count
 * @param {{id:number,username:string,text:string,email:string,status:number}} state.reducerAPI.tasks
 */
const mapStateToProps = (state) => selectorReducerText(state);

const mapDispatchToProps = { setCurrentEditingTask, endEditing };

export default connect(mapStateToProps, mapDispatchToProps)(TaskText);
