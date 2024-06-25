import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Components/Website/Pages/Home/Home";
import Contact from "./Components/Website/Pages/Contact/Contact";
import Login from "./Components/Dashboard/AuthAction/Login/Login";
import Books from "./Components/Website/Pages/Books/Books";
import Layout from "./Components/Website/Layout/Layout";
import Register from "./Components/Dashboard/AuthAction/Register/Register";
import FetchApiContextProvider from "./Context/FetchApiContext";
import BooksDetails from "./Components/Website/Pages/Books/BooksDetails/BooksDetails";
import BookReadMode from "./Components/Website/Pages/Books/BookReadMode/BookReadMode";
import DashboardLayout from "./Components/Dashboard/DashboardLayout/DashboardLayout";
import BooksFromDashboard from "./Components/Dashboard/Pages/Books/Books";
import User from "./Components/Dashboard/Pages/UserProfile/Users";
import Dashboard from "./Components/Dashboard/Pages/Home/Dashboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        //! Website Routs -----------------------------
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="books"
            element={
              <FetchApiContextProvider>
                <Books />
              </FetchApiContextProvider>
            }
          />
          <Route path="/books/:id" element={<BooksDetails />} />
          <Route path="/read" element={<BookReadMode />} />
        </Route>
        //! Dashboard Routs -----------------------------
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/users" element={<User />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="books-table"
            element={
              <FetchApiContextProvider>
                <BooksFromDashboard />
              </FetchApiContextProvider>
            }
          />
        </Route>
      </>
    )
  );

  // useEffect(() => {
  //   const isUserLogged = isToken();
  //   if (isUserLogged) {
  //     console.log("user is LOGGED IN", isUserLogged);
  //   } else {
  //     console.log("user is NOT LOGGED IN", isUserLogged);
  //   }
  // }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
