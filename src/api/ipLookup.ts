import { client } from "../helpers/fetchClient";
import { IpData } from "../types";

const endpoint = '/iplookup?address=';

export const getInfo = (ipData: string) => {
  return client.get<IpData>(endpoint + ipData)
    .then((response) => {
      return response.data;
    });
};