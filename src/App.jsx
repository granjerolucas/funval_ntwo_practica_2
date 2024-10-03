import { useState } from "react";
import { Filters } from "./components/Filters";
import { Results } from "./components/Results";
import "./index.css";
import { ProviderRouteContext } from "./utils/ProviderRouteContext";
import { StoreImagesProvider } from "./utils/StoreImagesProvider";
function App() {
  const [loading, setLoading] = useState(true);
  return (
    <ProviderRouteContext>
      <StoreImagesProvider>
        <div className="container mx-auto bg-slate-700x mt-20 p-2 max-w-screen-md mb-4">
          <h1 className="text-5xl font-bold text-center italic my-8">SnapShot</h1>
          <Filters onChangeLoading={setLoading} />
          <Results loading={loading} />
        </div>
      </StoreImagesProvider>
    </ProviderRouteContext>
  );
}

export default App;
