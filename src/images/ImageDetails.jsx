import { MainLayout } from "../MainLayout.jsx";
import { useImageFetching } from "./useImageFetching.js";
import { useParams } from 'react-router';

export function ImageDetails({authToken}) {
    const { imageId } = useParams();
    const { isLoading, fetchedImages } = useImageFetching(imageId, authToken);
    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    const imageData = fetchedImages[0];
    if (!imageData) {
        return <h2>Image not found</h2>;
    }

    return (
        <>
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </>
    )
}
