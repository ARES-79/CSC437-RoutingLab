import "./ImageGallery.css";
import { Link } from 'react-router';
import { ImageUploadForm } from "./ImageUploadForm";

export function ImageGallery({ isLoading, fetchedImages, authToken }) {

    const imageElements = fetchedImages.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">  
            <Link to={`/images/${image._id}`}>
                <img src={image.src} alt={image.name} />
            </Link>
        </div>
    ));

    return (
        <>
            <h2>Image Gallery</h2>
            {isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>

            <h3>Uplaod Image</h3>
            <ImageUploadForm authToken={authToken}/>
        </>
    );
}
