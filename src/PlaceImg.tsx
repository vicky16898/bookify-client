export default function PlaceImg({ place, index = 0, className }: { place: any, index?: number, className?: string }) {
    const baseAPIPath = process.env.API_BASE_PATH || 'http://localhost:4000';
    if (!place.photos?.length) {
        return null; // Return null if there are no photos
    }

    // Default className if not provided
    className =  'object-cover w-full h-full';

    return (
        <img
            src={`${baseAPIPath}/uploads/${place.photos[index]}`}
            alt={place.title || 'Place'}
            className={className}
        />
    );
}
