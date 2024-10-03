import { useCallback, useContext, useEffect, useRef } from "react";
import { useParams } from "../utils/useParams";
import { ButtonsLink } from "./ButtonsLink";
import { StoreImagesContext } from "../utils/StoreImagesProvider";
import {
  getImagesByTag,
  getImagesByTextSearch,
  getRecents,
} from "../api/Flickr.api";
import { baseUrl } from "../utils/helpers";

export const Filters = ({ onChangeLoading }) => {
  const { tags, setResults, setCriteriaFilterName } =
    useContext(StoreImagesContext);
  const params = useParams();
  console.log(params.get("q"));
  const refReq = useRef(null);

  const fnGetImagesByTag = useCallback(
    (tag) => {
      if (refReq.current) refReq.current.cancel();
      onChangeLoading(true);
      setCriteriaFilterName(tag);
      refReq.current = getImagesByTag(tag);
      refReq.current.action.then((res) => {
        setResults(res.photos.photo);
        onChangeLoading(false);
      });
    },
    [onChangeLoading, setCriteriaFilterName, setResults]
  );
  const fnGetImagesByText = useCallback(
    (text) => {
      if (refReq.current) refReq.current.cancel();
      setCriteriaFilterName(text);
      onChangeLoading(true);

      refReq.current = getImagesByTextSearch(text);
      refReq.current.action.then((res) => {
        onChangeLoading(false);

        setResults(res.photos.photo);
      });
    },
    [onChangeLoading, setCriteriaFilterName, setResults]
  );

  const getRecentsImages = useCallback(() => {
    if (refReq.current) refReq.current.cancel();
    onChangeLoading(true);

    refReq.current = getRecents();
    refReq.current.action.then((res) => {
      onChangeLoading(false);

      setResults(res.photos.photo);
    });
  }, [onChangeLoading, setResults]);

  const fnOnClick = useCallback(
    (e) => {
      e.preventDefault();
      const search = e.target.elements.search.value;
      window.history.pushState({}, "", baseUrl(`?q=${search}`));
      fnGetImagesByText(search);
    },
    [fnGetImagesByText]
  );

  useEffect(() => {
    if (params.get("tag")) {
      const tag = params.get("tag");
      fnGetImagesByTag(tag);
    } else if (params.get("q")) {
      const q = params.get("q");
      fnGetImagesByText(q);
    } else {
      getRecentsImages();
    }
  }, [fnGetImagesByTag, fnGetImagesByText, getRecentsImages, params]);

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center overflow-y-auto">
      <form className="min-w-[25rem] mx-auto" onSubmit={fnOnClick}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="search"
            id="search"
            name="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>

      <div className="flex gap-2">
        <ButtonsLink href={baseUrl()} label={"Recents"} />
        {tags.map((item) => {
          const href = baseUrl(`?tag=${item._content}`);
          return (
            <ButtonsLink
              key={item._content}
              href={href}
              label={item._content}
            />
          );
        })}
      </div>
    </div>
  );
};
