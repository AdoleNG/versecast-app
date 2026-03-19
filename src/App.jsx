import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerseCastMarketingSite from "./VerseCastMarketingSite";
import AcceptInvite from "./AcceptInvite";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerseCastMarketingSite />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

