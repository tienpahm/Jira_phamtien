import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Popover, Popconfirm, Button, AutoComplete} from "antd";
import {Table} from "antd";
import {Link} from "react-router-dom";
import {
  ASSIGN_USER_PROJECT_SAGA,
  CURRENT_USER,
  DELETE_PROJECT_SAGA,
  DELETE_USER_PROJECT,
  DISPLAY_LOADING,
  EDIT_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_ALL_USER_SAGA,
  GET_CATEGORY_SAGA,
  HIDE_LOADING,
  MODAL_EDIT,
  TRIGGER_CREATE_TASK,
} from "../../redux/constant/BugtifyConstant";
import EditProjectModal from "../../Component/EditProjectModal";
export default function ProjectManagement(props) {
  const dispatch = useDispatch();
  //data collect from redux
  const {arrProject} = useSelector((state) => state.ProjectReducer);
  const arrProjectReverse = arrProject.reverse();
  const {arrUser} = useSelector((state) => state.UserReducer);
  //control component state
  const [value, setValue] = useState("");

  //life cycle
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_USER_SAGA,
    });

    dispatch({
      type: GET_CATEGORY_SAGA,
    });
    dispatch({
      type: TRIGGER_CREATE_TASK,
      trigger: false,
    });
    dispatch({
      type: CURRENT_USER,
      currentUser: JSON.parse(localStorage.getItem("USER_LOGIN")),
    });
    dispatch({
      type: HIDE_LOADING,
    });
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "projectName",
      render: (text, record, index) => {
        return (
          <Link
            style={{color: "#7149fc", fontWeight: "500"}}
            to={`/project/${record.id}`}>
            {record.projectName}
          </Link>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
    },
    {
      title: "Creator",
      render: (text, record, index) => {
        return (
          <span
            style={{
              padding: "5px 10px",
              background: "#7149fc52",
              color: "#191919",
              borderRadius: "5px",
              border: "1px solid #7149fc",
              fontWeight: "500",
            }}>
            {" "}
            {record.creator.name}
          </span>
        );
      },
    },
    {
      title: "Members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((item, index) => {
              return (
                <Popover
                  key={index}
                  content={
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {record?.members.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>{user.userId}</td>
                              <td>{user.name}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    dispatch({
                                      type: DELETE_USER_PROJECT,
                                      project: {
                                        projectId: record.id,
                                        userId: user.userId,
                                      },
                                    });
                                  }}>
                                  X
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  }
                  title="Title">
                  <img
                    key={index}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginLeft: "-5px",
                      border: "1px solid ",
                      cursor: "pointer",
                    }}
                    src={item.avatar}
                    alt="memberavatar"></img>
                </Popover>
              );
            })}
            {record.members?.length > 3 ? (
              <span
                style={{
                  display: "inline-block",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginLeft: "-5px",
                  marginBottom: "3px",
                  border: "1px solid ",
                  textAlign: "center",
                  background: "#DDDDDD",
                  transform: "translateY(-1px)",
                }}>
                ...
              </span>
            ) : (
              ""
            )}
            <Popover
              placement="topLeft"
              title={"Available"}
              content={
                <AutoComplete
                  value={value}
                  key={index}
                  style={{width: 200}}
                  options={arrUser.map((item, index) => {
                    return {label: item.name, value: item.userId.toString()};
                  })}
                  placeholder="Search User"
                  onChange={(value) => {
                    setValue(value);
                  }}
                  onSelect={(value, option) => {
                    setValue(option.label);
                    dispatch({
                      type: ASSIGN_USER_PROJECT_SAGA,
                      assignUser: {
                        userId: option.value,
                        projectId: record.id,
                      },
                    });
                  }}
                />
              }
              trigger="click">
              <button className="btn" style={{borderRadius: "50%"}}>
                +
              </button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div>
            <Popconfirm
              title="Are you sure to delete this task?"
              okText="Yes"
              onConfirm={() => {
                dispatch({
                  type: DELETE_PROJECT_SAGA,
                  projectId: record.id,
                });
              }}
              cancelText="No">
              <button className="btn">
                <i className="fa fa-trash"></i>
              </button>
            </Popconfirm>
            <button
              type="button"
              className="btn"
              data-toggle="modal"
              data-target="#exampleModalLong"
              onClick={() => {
                dispatch({
                  type: MODAL_EDIT,
                  editModal: EditProjectModal,
                });
                dispatch({
                  type: EDIT_PROJECT,
                  editProject: record,
                });
              }}>
              <i className="fa fa-pencil-alt"></i>
            </button>
          </div>
        );
      },
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      {}
      <h3 style={{color: "#191919"}}>
        BUGTIFY
        <span
          style={{
            color: "#7149fc",
            fontSize: "2rem",
            display: "inline-block",
            marginLeft: "5px",
          }}>
          .
        </span>
      </h3>
      <div>
        <h5>Project Management</h5>
      </div>
      <div style={{margin: "20px 0"}}>
        {" "}
        <span style={{fontWeight: "bold"}}>Protip</span> : You only allow to
        make change on your project
      </div>
      <Table
        columns={columns}
        dataSource={arrProjectReverse}
        onChange={onChange}
        rowKey="id"
      />
    </div>
  );
}
