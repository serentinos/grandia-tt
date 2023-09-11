import { client } from "../helpers/fetchClient";
import { TextData } from "../types";

const url = '/imagetotext';

export const postImage = (formData: FormData) => {
  return client.post<TextData[]>(url, formData).then((res) => res.data);
};