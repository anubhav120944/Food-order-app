import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Home from "./components/Layout/Home";
import ErrorBoundary from "./Error/ErrorBoundary";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
