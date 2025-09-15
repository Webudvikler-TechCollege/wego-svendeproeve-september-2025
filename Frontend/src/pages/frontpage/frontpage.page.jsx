import { FrontpageHeader } from "../../components/frontpageHeader/frontpageHeader"
import { fetchApi } from "../../utils/fetch/fetch"
import { useState, useEffect } from "react"
import spinner from '../../assets/spinner.svg'
import { useImageFetch } from "../../utils/fetch/imageFetch"

export const FrontPage = () => {
    const [slides, setSlides] = useState([]);
    const [slidesWithImages, setSlidesWithImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagesLoading, setImagesLoading] = useState(false);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                setLoading(true);
                const response = await fetchApi("/api/slides", "GET");
                if (response.success) {
                    setSlides(response.data);
                } else {
                    setError(response.error || "Failed to fetch slides");
                }
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    // Load images for all slides
    useEffect(() => {
        if (!slides.length) return;

        const loadImages = async () => {
            setImagesLoading(true);
            const slidesWithImageData = [];

            for (const slide of slides) {
                try {
                    if (slide.imageUrl) {
                        const response = await fetch(slide.imageUrl);
                        if (response.ok) {
                            const blob = await response.blob();
                            const imageUrl = URL.createObjectURL(blob);
                            slidesWithImageData.push({
                                ...slide,
                                imageData: blob,
                                imageBlobUrl: imageUrl,
                                imageLoading: false,
                                imageError: false
                            });
                        } else {
                            throw new Error(`Failed to load image: ${response.status}`);
                        }
                    } else {
                        slidesWithImageData.push({
                            ...slide,
                            imageData: null,
                            imageBlobUrl: null,
                            imageLoading: false,
                            imageError: false
                        });
                    }
                } catch (err) {
                    console.error('Error loading image:', slide.imageUrl, err);
                    slidesWithImageData.push({
                        ...slide,
                        imageData: null,
                        imageBlobUrl: null,
                        imageLoading: false,
                        imageError: true
                    });
                }
            }

            setSlidesWithImages(slidesWithImageData);
            setImagesLoading(false);
        };

        loadImages();

        // Cleanup blob URLs when component unmounts
        return () => {
            slidesWithImages.forEach(slide => {
                if (slide.imageBlobUrl) {
                    URL.revokeObjectURL(slide.imageBlobUrl);
                }
            });
        };
    }, [slides]);

    if (loading || imagesLoading) return <div><img src={spinner} alt="Loading..." /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <FrontpageHeader slides={slidesWithImages} />
        </div>
    )
}
