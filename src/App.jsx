import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import SessionHistory from "./dashboard/SessionHistory";
import OperatorsPage from "./OperatorsPage";
import InviteOperator from "./operators/InviteOperator";

function App() {
  const isLocalhost = window.location.hostname === "localhost";

  return (
    <BrowserRouter>
      <Routes>
        {/* Root route: Marketing site in production, Login in dev */}
        <Route
          path="/"
          element={isLocalhost ? <Login /> : <VerseCastMarketingSite />}
        />

        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route path="/invite-success" element={<InvitationSuccess />} />
        <Route path="/create-church" element={<CreateChurch />} />

        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Explicit login + signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          <Route path="sessions/start-session" element={<StartSession />} />
          <Route path="sessions/end-session" element={<EndSession />} />

          <Route path="operators">
            <Route index element={<OperatorsPage />} />
            <Route path="invite" element={<InviteOperator />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
