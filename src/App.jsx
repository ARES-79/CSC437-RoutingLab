import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { Routes, Route } from "react-router";
import { useImageFetching } from "./images/useImageFetching.js";
import { useState } from "react";
import { MainLayout } from "./MainLayout.jsx";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

function App() {
  const [userName, setUsername] = useState("John Doe");
  const [authToken, setAuthToken] = useState("");
  const { isLoading, fetchedImages } = useImageFetching("", authToken);

  const POSSIBLE_ROUTES =
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={
          <ProtectedRoute authToken={authToken} >
            <Homepage userName={userName} />
          </ProtectedRoute>} />
        <Route path="/account" element={
          <ProtectedRoute authToken={authToken} >
            <AccountSettings handleUserNameChange={setUsername} />
          </ProtectedRoute>} />
        <Route path="/images" element={
          <ProtectedRoute authToken={authToken} >
            <ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} />
          </ProtectedRoute>
        } />
        <Route path="/images/:imageId" element={
          <ProtectedRoute authToken={authToken} >
            <ImageDetails authToken={authToken} />
          </ProtectedRoute>} />
        <Route path="/register" element={<RegisterPage onValidRegister={setAuthToken} />} />
        <Route path="/login" element={<LoginPage onValidLogin={setAuthToken} />} />
      </Route>
    </Routes>

  return POSSIBLE_ROUTES;
}

export default App
