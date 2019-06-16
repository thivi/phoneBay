import { api } from "./util";
import axios from "axios";

export function create(model, data) {
  let url = api + model;
  let options = {
    method: "POST",
    data: data,
    url: url
  };
  return axios(options);
}

export function read(model, id) {
  let url = id ? api + model + "/" + id : api + model;
  let options = {
    method: "GET",
    url: url
  };
  return axios(options);
}

export function del(model, id) {
  let url = api + model + "/" + id;
  let options = {
    url: url,
    method: "DELETE"
  };
  return axios(options);
}
