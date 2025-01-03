
import { memo } from "react";
import { store } from "@/store/store";
// import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { router } from "@/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/queryClient'



const App = () => {
  return (
    <div className="w-screen h-screen">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default memo(App);

// import { memo } from "react";
// import { store, persistor } from "@/store/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { RouterProvider } from "react-router-dom";

// import { Provider } from "react-redux";
// import { router } from "@/router";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from '@/queryClient'



// const App = () => {
//   return (
//     <div className="w-screen h-screen">
//       <Provider store={store}>
//         <QueryClientProvider client={queryClient}>
//           <PersistGate loading={null} persistor={persistor}>
//             <RouterProvider router={router} />
//           </PersistGate>
//         </QueryClientProvider>
//       </Provider>
//     </div>
//   );
// };

// export default memo(App);
