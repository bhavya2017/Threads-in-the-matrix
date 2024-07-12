import axios from "axios";
export const getProductAPI = async (field, params) => {
  let res = await axios.get(
    `https://backend-64ej.onrender.com/${field}`,
    params
  );
  let data = res.data;
  let totalCount = res.headers.get("x-total-count");

  return { data, totalCount };
};
