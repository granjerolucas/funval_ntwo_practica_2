import { useContext } from "react";
import { RouteContext } from "./ProviderRouteContext";

export const useParams = () => {
  const [params] = useContext(RouteContext);
  return params;
};
