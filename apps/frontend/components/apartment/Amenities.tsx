export default function AmenitiesSection({ amenities }: { amenities: string[] | undefined }) {
    if (amenities == null || amenities.length === 0) return null;
  
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-4 mt-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Amenities</h2>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700">
            {amenities.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>
    );
}
  