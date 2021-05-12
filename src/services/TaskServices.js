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
}
export const taskService = new TaskService();
