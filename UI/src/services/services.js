import axios from "axios";
import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";

export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callInfiniteScroll(count, searchVal, sortOrder, sortBy) {
  return axios.get(
    `${SERVER_URL}/scroll?`,
    {
    params:{
      count: count,
      searchVal: searchVal,
      sortOrder: sortOrder,
      sortBy: sortBy 
    }
    },);
}

export function callPredict(predData) {
  return axios.post(
    `http://127.0.0.1:5000/predict`,
      {
        id: `${ROLL_NUMBER}`,
        data: predData,
      }
  );
}

export function callAddInvoice(details) {

  return axios.post(`${SERVER_URL}/add`, details)
}
