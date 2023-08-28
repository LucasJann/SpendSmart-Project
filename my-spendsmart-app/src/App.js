import React, { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store/index'

import Goal from "./components/Goal/Goal";
import Login from "./components/Layout/Login"
import Income from "./components/Income/Income";
import Profile from "./components/Layout/Profile";
import Expense from "./components/Expense/Expense";
import Register from "./components/Layout/Register";
import LandingPage from "./components/Layout/LandingPage";
import IncomeHistory from "./components/Income/IncomeHistory";
import ExpenseHistory from "./components/Expense/ExpenseHistory";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
      { path: "/registerPage", element: <Register /> },
      { path: "/landingPage", element: <LandingPage /> },
      { path: "/profilePage", element: <Profile /> },
      { path: "/expensePage", element: <Expense /> },
      { path: "/expenseHistoryPage", element: <ExpenseHistory /> },
      { path: "/incomePage", element: <Income /> },
      { path: "/incomeHistoryPage", element: <IncomeHistory /> },
      { path: "/goalPage", element: <Goal /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
