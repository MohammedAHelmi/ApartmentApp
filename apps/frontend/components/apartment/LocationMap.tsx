interface MapEmbedProps {
    latitude?: number;
    longitude?: number;
}
  
export default function MapEmbed({ latitude, longitude }: MapEmbedProps) {
    if(latitude == null || longitude == null)
        return null;
    
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;

    return (
        <div className="w-full max-w-4xl mx-auto h-64 mt-6 mb-12">
            <h2 className="text-lg font-bold mb-2">Location on Map</h2>
            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
            ></iframe>
        </div>
    );
}
  