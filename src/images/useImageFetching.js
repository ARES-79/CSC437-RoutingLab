import { useEffect, useState } from "react";

const IMAGES = [
    {
        id: "0",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg",
        name: "Blue merle herding sheep"
    },
    {
        id: "1",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/2560px-Huskiesatrest.jpg",
        name: "Huskies"
    },
    {
        id: "2",
        src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg",
        name: "Shiba"
    },
    {
        id: "3",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/2560px-Felis_catus-cat_on_snow.jpg",
        name: "Tabby cat"
    },
    {
        id: "4",
        src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Male_and_female_chicken_sitting_together.jpg",
        name: "Chickens"
    }
];

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
export function useImageFetching(imageId, authToken, delay = 1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const url = imageId ? `/api/images/${imageId}` : '/api/images';
                const response = await fetch(url, {
                    method: 'GET', // Optional, since GET is default
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Replace with your actual token
                        'Content-Type': 'application/json' // Optional, depending on the API requirements
                    }
                });
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    return;
                }
                const data = await response.json(); // Parse JSON data
                setFetchedImages(data); // Update state with fetched data
            } catch (error) {
                console.error(`Could not get images: ${error}`);
                throw error;
            } finally {
                setIsLoading(false); // Set loading to false after fetching is complete
            }
        };
        console.log("fetching images from api");
        fetchImages();
    }, [imageId, authToken]);

    return { isLoading, fetchedImages };
}
