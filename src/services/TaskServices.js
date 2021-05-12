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
}
export const taskService = new TaskService();
