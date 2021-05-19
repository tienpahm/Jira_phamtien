import React from "react";
import {baseService} from "./BaseServices";

class TaskService extends baseService {
  constructor() {
    super();
  }
  getProjectDetail = (id) => {
    return this.get(`Project/getProjectDetail?id=${id}`);
  };
  getStatusList = () => {
    return this.get(`Status/getAll`);
  };
  updateStatus = (updateTaskStatus) => {
    return this.put(`Project/updateStatus`, updateTaskStatus);
  };
  getTaskTypeList = () => {
    return this.get(`TaskType/getAll`);
  };
  getPriorityList = () => {
    return this.get(`Priority/getAll?id=0`);
  };
  createTask = (project) => {
    return this.post(`Project/createTask`, project);
  };
  removeTask = (taskId) => {
    return this.delete(`Project/removeTask?taskId=${taskId}`);
  };
  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };
  updateTask = (taskUpdate) => {
    return this.post(`Project/updateTask`, taskUpdate);
  };
  removeUserFromTask = (taskDeleteInfo) => {
    return this.post(`Project/removeUserFromTask`, taskDeleteInfo);
  };
  getAllCommnetTask = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };
  insertCommentTask = (comment) => {
    return this.post(`Comment/insertComment`, comment);
  };
  deletComment = (commentId) => {
    return this.delete(`Comment/deleteComment?idComment=${commentId}`);
  };
  updateComment = (commentId, contentComment) => {
    return this.put(
      `Comment/updateComment?id=${commentId}&contentComment=${contentComment}`
    );
  };
}
export const taskService = new TaskService();
