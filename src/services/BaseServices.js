import Axios from "axios";
import {DOMAIN_BUGTIFY, TOKEN} from "../util/constant/system";

export class baseService {
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN_BUGTIFY}/${url}`,
      method: "PUT",
      headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN)},
      data: model,
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${DOMAIN_BUGTIFY}/${url}`,
      method: "POST",
      headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN)},
      data: model,
    });
  };

  get = (url) => {
    return Axios({
      url: `${DOMAIN_BUGTIFY}/${url}`,
      method: "GET",
      headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN)},
    });
  };
  delete = (url) => {
    return Axios({
      url: `${DOMAIN_BUGTIFY}/${url}`,
      method: "DELETE",
      headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN)},
    });
  };
}
