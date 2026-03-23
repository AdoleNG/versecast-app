import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcceptInvite from "./AcceptInvite";
import InvitationSuccess from "./InvitationSuccess";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Sessions from "./Sessions";
import ControlPanel from "./ControlPanel";
import Presenter from "./Presenter";
import AuthCallback from "./AuthCallback";
import CreateChurch from "./CreateChurch";


// OPTIONAL: placeholder pages if you don't have them yet
const Operators = () => <div className="p-10">Operators Page (Coming Soon)</div>;
const Settings = () => <div className="p-10">Settings Page (Coming Soon)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Login />} />

        {/* Operator onboarding */}
        <Route path="/accept-invite/:token" element={<AcceptInvite />} />
        <Route path="/invite-success" element={<InvitationSuccess />} />
        <Route path="/create-church" element={<CreateChurch />} />

        {/* OAuth callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Pages linked from sidebar */}
        <Route path="/control-panel" element={<ControlPanel />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/operators" element={<Operators />} />
        <Route path="/settings" element={<Settings />} />

        {/* Presenter */}
        <Route path="/control-panel/:sid" element={<ControlPanel />} />
        <Route path="/presenter/:sid" element={<Presenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
