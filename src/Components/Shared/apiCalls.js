import axios from "axios";

export const fget = async ({ url }) => {
  const res = await axios.get(process.env.REACT_APP_BASE_URL + `${url}`, {
  });
  return res;
};

export const fpatch = async ({ url, data }) => {
  const res = await axios.patch(
    process.env.REACT_APP_BASE_URL + `${url}`,
    data,
    {
    }
  );
  return res;
};

export const fpost = async ({ url, data }) => {
  const res = await axios.post(
    process.env.REACT_APP_BASE_URL + `${url}`,
    data,
    {
    }
  );
  return res;
};

export const fdelete = async ({ url }) => {
  const res = await axios.delete(process.env.REACT_APP_BASE_URL + `${url}`, {
  });
  return res;
};