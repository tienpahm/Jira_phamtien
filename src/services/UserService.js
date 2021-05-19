import React from "react";
import {baseService} from "./BaseServices";

class UseService extends baseService {
  constructor() {
    super();
  }
  getAllUser = () => {
    return this.get(`Users/getUser`);
  };
  signUpuser = (user) => {
    return this.post(`Users/signup`, user);
  };
  editUser = (user) => {
    return this.put(`Users/editUser`, user);
  };
  deleteUser = (userId) => {
    return this.delete(`Users/deleteUser?id=${userId}`);
  };
}
export const useService = new UseService();
