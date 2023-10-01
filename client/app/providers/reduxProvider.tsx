// "use client";
// import { Provider } from "react-redux";
// import { store } from "../store";
// import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore";

// let persist = persistStore(store);

// function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persist}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

// export default Providers;
"use client";
import { Provider } from "react-redux";
import { store } from "../store";
function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
