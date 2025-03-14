import { useId, useState } from 'react';
import { useActionState } from "react";

export function ImageUploadForm({ authToken }) {
    const inputId = useId();
    const [imgSrc, setImgSrc] = useState(null);

    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {

            const image = formData.get("image");
            const imageName = formData.get("name");

            if (!imageName || !image) {
                return {
                    type: "error",
                    message: `Please fill in the image name and upload an image.`,
                };
            }

            try {
                const response = await fetch("/api/images", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (!response.ok) {
                    setImgSrc(null);
                    return {
                        type: "error",
                        message: `${response.status}: Error submitting the image.`,
                    };
                }
            } catch (error) { // Network error
                console.error(error);
                // Return an error message...
            }
        },
        null
    );

    function readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    function handleFileSelected(e) {
        const inputElement = e.target;
        const fileObj = inputElement.files[0];
        readAsDataURL(fileObj).then((newImgSrc) => setImgSrc(newImgSrc));
    }

    return (
        <>
            {result && <p className={`message ${result.type}`}>{result.message}</p>}
            {isPending && <p className="message loading">Loading ...</p>}
            <form action={submitAction}>
                <div>
                    <label htmlFor={inputId}>Choose image to upload: </label>
                    <input
                        id={inputId}
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleFileSelected}
                    />
                </div>
                <div>
                    <label>
                        <span>Image title: </span>
                        <input name="name" />
                    </label>
                </div>

                <div> {/* Preview img element */}
                    <img style={{ maxWidth: "20em" }} src={imgSrc} alt="" />
                </div>

                <button>Confirm upload</button>
            </form>
        </>
    );
}