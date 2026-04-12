import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AcceptInvite from "./AcceptInvite";
import InvitationSuccess from "./InvitationSuccess";
import Login from "./Login";
import Signup from "./Signup";
import AuthCallback from "./AuthCallback";
import CreateChurch from "./CreateChurch";
import VerseCastMarketingSite from "./VerseCastMarketingSite";

// NEW DASHBOARD FILES
import DashboardLayout from "./DashboardLayoutNew";
import DashboardHome from "./dashboard/DashboardHomeNew";
import StartSession from "./dashboard/StartSession";
import EndSession from "./dashboard/EndSession";
import OperatorsPage from "./OperatorsPage";
import InviteOperator from "./operators/InviteOperator";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ⭐ Default route → ALWAYS go to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Invitations */}
        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route path="/invite-success" element={<InvitationSuccess />} />

        {/* Onboarding */}
        <Route path="/create-church" element={<CreateChurch />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="sessions/start-session" element={<StartSession />} />
          <Route path="sessions/end-session" element={<EndSession />} />

          <Route path="operators">
            <Route index element={<OperatorsPage />} />
            <Route path="invite" element={<InviteOperator />} />
          </Route>
        </Route>

        {/* Optional: keep marketing site accessible */}
        <Route path="/marketing" element={<VerseCastMarketingSite />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
