import { clientTest } from "../helpers/fetchClient";
import { TextData } from "../types";

const url = '/imagetotext';

export const postImage = (formData: FormData) => {
  return clientTest.post<TextData[]>(url, formData);
};