import { Routes, Route, BrowserRouter } from "react-router-dom";
import Writting from "./pages/Writting";
import Login from "./pages/Login";
import { Header } from "./ui/Header";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/writting" element={<Writting />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
