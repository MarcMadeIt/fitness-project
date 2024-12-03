import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Activity from "./pages/Activity";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Topbar from "./components/layout/Topbar";
import Start from "./pages/Start";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative app mb-16">
        <header>
          <Topbar />
        </header>
        <main className="px-5 py-3 gap-5">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Start />} />
              <Route path="/activity" element={<Activity />} />
            </Routes>
          </div>
        </main>
        <nav className="w-full">
          <Navbar />
        </nav>
      </div>
    </BrowserRouter>
  );
};

export default App;
