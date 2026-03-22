console.log("App is rendering");
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcceptInvite from "./AcceptInvite";
import InvitationSuccess from "./InvitationSuccess";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Sessions from "./Sessions";
import ControlPanel from "./ControlPanel";
import Presenter from "./Presenter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* React App Homepage */}
        <Route path="/" element={<Login />} />

        {/* Operator onboarding */}
        <Route path="/accept-invite/:token" element={<AcceptInvite />} />
        <Route path="/invite-success" element={<InvitationSuccess />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Operator Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/control-panel/:sid" element={<ControlPanel />} />
        <Route path="/presenter/:sid" element={<Presenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
