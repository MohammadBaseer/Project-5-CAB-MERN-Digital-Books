import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
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
import UserProfile from "./Components/Website/Pages/UserProfile/UserProfile";
import ProtectedRoute from "./Components/Dashboard/AuthAction/ProtectedRouts/ProtectedRouts";
import NotFound from "./Components/Website/Pages/NotFound";
import WebContactMessages from "./Components/Dashboard/Pages/WebContactMessages/WebContactMesages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        //! Website Routs -----------------------------
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route
            index
            element={
              <FetchApiContextProvider>
                <Home />
              </FetchApiContextProvider>
            }
          />
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Route>
        //! Dashboard Routs -----------------------------
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/books-table"
            element={
              <FetchApiContextProvider>
                {/* <ProtectedRoute> */}
                <BooksFromDashboard />
                {/* </ProtectedRoute> */}
              </FetchApiContextProvider>
            }
          />
          <Route path="/users" element={<User />} />
          <Route path="/messages" element={<WebContactMessages />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
