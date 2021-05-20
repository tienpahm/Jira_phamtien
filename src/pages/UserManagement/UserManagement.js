import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  DELETE_USER_SAGA,
  EDIT_USER_MANAGEMENT,
  GET_ALL_USER_SAGA,
  MODAL_EDIT,
  TRIGGER_CREATE_TASK,
} from "../../redux/constant/BugtifyConstant";
import {Popover, Popconfirm, Button, AutoComplete, Table} from "antd";
import EditUser from "../../Component/UserModal/EditUser";

export default function UserManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_USER_SAGA,
    });
    dispatch({
      type: TRIGGER_CREATE_TASK,
      trigger: false,
    });
  }, []);

  const {arrUser} = useSelector((state) => state.UserReducer);

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "id",
    },
    {
      title: "Name",
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
            {record.name}
          </span>
        );
      },
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
                  type: DELETE_USER_SAGA,
                  userId: record.userId,
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
                  editModal: EditUser,
                });
                dispatch({
                  type: EDIT_USER_MANAGEMENT,
                  targetUser: record,
                });
              }}>
              <i className="fa fa-pencil-alt"></i>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
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
        <h5> User Management</h5>
      </div>
      <Table dataSource={arrUser} columns={columns} rowKey="userId" />
    </div>
  );
}
