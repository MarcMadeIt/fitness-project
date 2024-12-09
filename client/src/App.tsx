import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Activity from "./pages/Activity";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Topbar from "./components/layout/Topbar";
import Start from "./pages/Add";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import cookie from "js-cookie";
import ProtectedRoute from "./secure/ProtectedRoute";
import { login } from "./store/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookie.get("token");

    if (token) {
      dispatch(login({ token }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="relative app">
        <header>
          <Topbar />
        </header>
        <main className="px-3 py-3 gap-5 mb-16">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <Start />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity"
                element={
                  <ProtectedRoute>
                    <Activity />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>
        <nav className="">
          <Navbar />
        </nav>
      </div>
    </BrowserRouter>
  );
};

export default App;
