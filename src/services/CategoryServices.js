import {baseService} from "./BaseServices";

class CategoryServices extends baseService {
  constructor() {
    super();
  }

  getProjectCategory = () => {
    return this.get(`ProjectCategory`);
  };
}

export const categoryServices = new CategoryServices();
