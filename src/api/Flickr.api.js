import { getRequest } from ".";
import {
  API_FLICKR_URL as URL,
  API_KEY_FLICKR as KEY,
} from "../utils/constanst";

export const getTags = () => {
  return getRequest(
    `${URL}?method=flickr.tags.getHotList&api_key=${KEY}&count=5&format=json&nojsoncallback=1`
  );
};

export const getImagesByTag = (tag, page = 1, perPage = 20) => {
  return getRequest(
    `${URL}?method=flickr.photos.search&api_key=${KEY}&tags=${tag}&format=json&nojsoncallback=1&page=${page}&per_page=${perPage}`
  );
};
export const getImagesByTextSearch = (tag, page = 1, perPage = 20) => {
  return getRequest(
    `${URL}?method=flickr.photos.search&api_key=${KEY}&text=${tag}&format=json&nojsoncallback=1&page=${page}&per_page=${perPage}`
  );
};
export const getRecents = (page = 1, perPage = 20) => {
  return getRequest(
    `${URL}?method=flickr.photos.getRecent&api_key=${KEY}&format=json&nojsoncallback=1&page=${page}&per_page=${perPage}`
  );
};
