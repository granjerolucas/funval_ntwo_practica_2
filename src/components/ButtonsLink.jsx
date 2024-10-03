import { useContext } from "react";
import { baseUrl } from "../utils/helpers";
import { RouteContext } from "../utils/ProviderRouteContext";

export const ButtonsLink = ({ href, label }) => {
  const [, fnReload] = useContext(RouteContext);
  return (
    <a
      href={baseUrl(href)}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, "", href);
        fnReload(new Date().getTime());
      }}
      type="button"
      className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/80 dark:focus:ring-gray-400 me-2 mb-2 capitalize"
    >
      {label}
    </a>
  );
};
