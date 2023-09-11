export interface IpData {
  "is_valid": boolean,
  "country": string,
  "country_code": string,
  "region_code": string,
  "region": string,
  "city": string,
  "zip": string,
  "lat": number,
  "lon": number,
  "timezone": string,
  "isp": string,
  "address": string
}

export interface TextData {
  text: string;
  bounding_box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}