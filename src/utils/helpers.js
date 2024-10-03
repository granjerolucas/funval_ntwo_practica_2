import { BASE_URL } from "./constanst";

export const baseUrl = (path = "") => {
  return `${BASE_URL}${path}`;
};
