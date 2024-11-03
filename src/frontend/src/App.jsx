import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Base from "./pages/Base"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

// At logout clear tokens
function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

// When registering clear tokens before
function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // Can only be accessed when token is set
            <ProtectedRoute>
              <Base />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App