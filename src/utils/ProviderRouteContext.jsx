import { createContext, useState } from "react";

export const RouteContext = createContext();
export const ProviderRouteContext = ({ children }) => {
  let [params, setParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const fnReload = () => {
    setParams(new URLSearchParams(window.location.search));
  };

  return (
    <RouteContext.Provider value={[params, fnReload]}>
      {children}
    </RouteContext.Provider>
  );
};
