import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerseCastMarketingSite from "./VerseCastMarketingSite";
import AcceptInvite from "./AcceptInvite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerseCastMarketingSite />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;