import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { Routes, Route } from "react-router";
import { useImageFetching } from "./images/useImageFetching.js";
import { useState } from "react";
import { MainLayout } from "./MainLayout.jsx";

function App() {
    const [userName, setUsername] = useState("John Doe");
    const { isLoading, fetchedImages } = useImageFetching("");
    // const POSSIBLE_PAGES = [
    //     <Homepage userName="John Doe" />,
    //     <AccountSettings />,
    //     <ImageGallery />,
    //     <ImageDetails imageId="0" />
    // ]
    const POSSIBLE_ROUTES =
    <Routes>
      <Route path="/" element={<MainLayout/>} >
        <Route path="/" element={<Homepage userName={userName} />} />
        <Route path="/account" element={<AccountSettings handleUserNameChange={setUsername} />} />
        <Route path="/images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages}/>} />
        <Route path="/images/:imageId" element={<ImageDetails />} />
      </Route>
    </Routes>

    return POSSIBLE_ROUTES;
}

export default App
