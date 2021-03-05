/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.less";
import { getPage } from "./store/requests";

// const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };

// const EditableCell = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef(null);
//   const form = useContext(EditableContext);
//   useEffect(() => {
//     if (editing) {
//       inputRef.current.focus();
//     }
//   }, [editing]);

//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({
//       [dataIndex]: record[dataIndex],
//     });
//   };

//   const save = async () => {
//     try {
//       const values = await form.validateFields();
//       toggleEdit();
//       handleSave({ ...record, ...values });
//     } catch (errInfo) {
//       // eslint-disable-next-line no-console
//       console.log("Save failed:", errInfo);
//     }
//   };

//   let childNode = children;

//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{
//           margin: 0,
//         }}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `${title} is required.`,
//           },
//         ]}
//       >
//         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{
//           paddingRight: 24,
//         }}
//         onKeyPress={toggleEdit}
//         onClick={toggleEdit}
//         role="button"
//         tabIndex="0"
//       >
//         {children}
//       </div>
//     );
//   }

//   return <td {...restProps}>{childNode}</td>;
// };

// class EditableTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.columns = [
//       {
//         title: "name",
//         dataIndex: "name",
//         width: "30%",
//         editable: true,
//       },
//       {
//         title: "age",
//         dataIndex: "age",
//       },
//       {
//         title: "address",
//         dataIndex: "address",
//       },
//       {
//         title: "operation",
//         dataIndex: "operation",
//         render: (_, record) => {
//           const {
//             dataSource: { length },
//           } = this.state;

//           return (
//             length >= 1 && (
//               <Popconfirm
//                 title="Sure to delete?"
//                 onConfirm={() => this.handleDelete(record.key)}
//               >
//                 <span>Delete</span>
//               </Popconfirm>
//             )
//           );
//         },
//       },
//     ];
//     this.state = {
//       dataSource: [
//         {
//           key: "0",
//           name: "Edward King 0",
//           age: "32",
//           address: "London, Park Lane no. 0",
//         },
//         {
//           key: "1",
//           name: "Edward King 1",
//           age: "32",
//           address: "London, Park Lane no. 1",
//         },
//       ],
//       count: 2,
//     };
//   }

//   handleDelete = (key) => {
//     const { dataSource } = this.state;
//     this.setState({
//       dataSource: dataSource.filter((item) => item.key !== key),
//     });
//   };

//   handleAdd = () => {
//     const { count, dataSource } = this.state;
//     const newData = {
//       key: count,
//       name: `Edward King ${count}`,
//       age: "32",
//       address: `London, Park Lane no. ${count}`,
//     };
//     this.setState({
//       dataSource: [...dataSource, newData],
//       count: count + 1,
//     });
//   };

//   handleSave = (row) => {
//     const { dataSource } = this.state;
//     const newDataSource = [...dataSource];
//     const index = newDataSource.findIndex((item) => row.key === item.key);
//     const item = newDataSource[index];
//     newDataSource.splice(index, 1, { ...item, ...row });
//     this.setState({
//       dataSource: newDataSource,
//     });
//   };

//   render() {
//     const { dataSource } = this.state;
//     const components = {
//       body: {
//         row: EditableRow,
//         cell: EditableCell,
//       },
//     };
//     const columns = this.columns.map((col) => {
//       if (!col.editable) {
//         return col;
//       }

//       return {
//         ...col,
//         onCell: (record) => ({
//           record,
//           editable: col.editable,
//           dataIndex: col.dataIndex,
//           title: col.title,
//           handleSave: this.handleSave,
//         }),
//       };
//     });
//     return (
//       <div>
//         <Button
//           onClick={this.handleAdd}
//           type="primary"
//           style={{
//             marginBottom: 16,
//           }}
//         >
//           Add a row
//         </Button>
//         <Table
//           components={components}
//           rowClassName={() => "editable-row"}
//           bordered
//           dataSource={dataSource}
//           columns={columns}
//         />
//       </div>
//     );
//   }
// }

/**
 * @param {Object} state
 * @param {Function} state.getPage
 * @param {Object} state.reducerAPI
 * @param {number} state.reducerAPI.currentPage
 * @param {number} state.reducerAPI.total_task_count
 * @param {{id:number,username:string,text:string,email:string,status:number}} state.reducerAPI.tasks
 */
// eslint-disable-next-line no-unused-vars
function App({ reducerAPI, getPage }) {
  useEffect(() => {
    getPage();
  }, []);
  return <h1>I&apos;m here</h1>;
}

/**
 * @param {Object} state
 * @param {Object} state.reducerAPI
 * @param {number} state.reducerAPI.currentPage
 * @param {number} state.reducerAPI.total_task_count
 * @param {{id:number,username:string,text:string,email:string,status:number}} state.reducerAPI.tasks
 */
const mapStateToProps = ({ reducerAPI }) => ({
  reducerAPI,
});

const mapDispatchToProps = {
  getPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
