import { Route, Routes } from "react-router-dom";
import './App.css'
import Wrapper from 'components/Wrapper'
import HomePage from "pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "pages/Login";
import ProtectedRoute from "components/ProtectedRoute";
import { ROLES } from "constants/roles";
import RegisterPage from "pages/Register";
import SettingsPage from "pages/Settings";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/sign-up" element={<RegisterPage />} />

        <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </Wrapper>
  )
}

export default App
