import React, { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile";

import Welcome from "./components/Welcome";
import Expense from "./components/Expense";
import LandingPage from "./components/LadingPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Welcome /> },
      { path: "/profile", element: <Profile /> },
      { path: "/landingPage", element: <LandingPage /> },
      { path: "/myfinances", element: <Expense /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
