import React from "react";
import {baseService} from "./BaseServices";

class UseService extends baseService {
  constructor() {
    super();
  }
  getAllUser = () => {
    return this.get(`Users/getUser`);
  };
}
export const useService = new UseService();
