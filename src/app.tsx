import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { Header } from "./components/Header";
import { LocalizedMeta } from "./components/LocalizedMeta";

const Writting = lazy(() => import("./pages/Writting"));
const Login = lazy(() => import("./pages/Login"));
const Landing = lazy(() => import("./pages/Landing"));

function App() {
  return (
    <BrowserRouter>
      <LocalizedMeta />
      <Header />
      <div className="h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/writting" element={<Writting />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
