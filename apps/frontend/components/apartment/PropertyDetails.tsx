interface PropertyDetailsProps {
    unitName?: string;
    finishing?: string;
    deliveryDate?: string;
    developerName?: string;
}

export default function PropertyDetails({
    unitName,
    finishing,
    deliveryDate,
    developerName,
}: PropertyDetailsProps) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-4 mt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Property Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-bold text-sm sm:text-base text-gray-700">
            <div>
                <span className="text-gray-600">Unit Name:</span>{" "}
                {unitName}
            </div>
          <div>
            <span className="text-gray-600">Finishing:</span>{" "}
            {finishing}
          </div>
          <div>
            <span className="text-gray-600">Delivery Date:</span>{" "}
            {deliveryDate}
          </div>
          <div>
            <span className="text-gray-600">Developer:</span>{" "}
            {developerName}
          </div>
        </div>
      </div>
    );
}