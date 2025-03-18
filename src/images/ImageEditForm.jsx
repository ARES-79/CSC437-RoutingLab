import { useState } from "react";

export function ImageEditForm({authToken}) {
    const [imageId, setImageId] = useState("");
    const [imageName, setImageName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        try {
            const request = await fetch(`/api/images/${imageId}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: imageName })
            });
        } catch (error) {
            console.error(`Could not get update image name: ${error}`);
            throw error;
        }
        setImageId("");
        setImageName("");
        setIsLoading(false);
    }

    return (
        <div>
            <label style={{ display: "block" }}>
                Image ID
                <input
                    value={imageId}
                    disabled={isLoading}
                    onChange={(e) => setImageId(e.target.value)}
                />
            </label>
            <label style={{ display: "block" }}>
                New image name
                <input
                    value={imageName}
                    disabled={isLoading}
                    onChange={(e) => setImageName(e.target.value)}
                />
            </label>
            <button disabled={isLoading} onClick={handleSubmit}>Send request</button>
        </div>
    );
}