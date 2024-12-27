import { memo } from "react";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { router } from "@/router";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default memo(App);
