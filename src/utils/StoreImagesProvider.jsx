import { createContext, useEffect, useState } from "react";
import { getImagesByTag, getTags } from "../api/Flickr.api";

export const StoreImagesContext = createContext();

export const StoreImagesProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [tags, setTags] = useState([]);
  const [criteriaFilterName, setCriteriaFilterName] = useState("");

  useEffect(() => {
    const req = getTags();
    req.action.then((res) => {
      setTags(res.hottags.tag);
    });
    return () => {
      if (req) req.cancel();
    };
  }, []);

  return (
    <StoreImagesContext.Provider
      value={{
        results,
        tags,
        setResults,
        criteriaFilterName,
        setCriteriaFilterName,
      }}
    >
      {children}
    </StoreImagesContext.Provider>
  );
};
