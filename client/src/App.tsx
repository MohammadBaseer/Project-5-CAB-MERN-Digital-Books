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
import UserProfile from "./Components/Dashboard/DashbourdPages/UserProfile/UserProfile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
          <Route path="/profiletabel" element={<UserProfile />} />
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
