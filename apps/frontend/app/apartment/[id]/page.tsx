import Gallery from '@/components/apartment/Gallary';
import InfoBar from '@/components/apartment/InfoBar';
import PropertyDetails from '@/components/apartment/PropertyDetails';
import About from '@/components/apartment/About';
import AmenitiesSection from '@/components/apartment/Amenities';
import LocationMap from '@/components/apartment/LocationMap';
import { getApartment } from '@/lib/getApartment';
import ErrorComponent from '@/components/ErrorComponent';
import { HttpError } from '@/lib/Errors/HttpError';

export default async function page({ params }: { params: Promise<{ id: number}> }){
    const { id } = await params;
    const apartment = await getApartment(id);

    if(apartment instanceof Error){
        const errorCode = apartment instanceof HttpError? apartment.statusCode: null;
        return <ErrorComponent 
                message={apartment.message} 
                code={errorCode}/>;
    }

    return (
        <main className="p-4">
            <div className='w-full max-w-4xl mx-auto bg-white rounded-b-xl'>
                <Gallery images={apartment.pictures} />
                <InfoBar 
                    price={apartment.price} 
                    size={apartment.size} 
                    beds={apartment.beds} 
                    baths={apartment.baths} 
                    blockNumber={apartment.address.blockNumber}
                    projectName={apartment.address.project.name ?? apartment.address.project}
                    city={apartment.address.city}
                    province={apartment.address.province}
                />
            </div>
            <PropertyDetails 
                unitName={apartment.name}
                finishing={apartment.finishing}
                developerName={apartment.address.project.developer}
                deliveryDate={apartment.delivery}
            />
            <LocationMap latitude={apartment.address.location?.lat} longitude={apartment.address.location?.long} />
            <About 
                about={apartment.about}
            />
            <AmenitiesSection
                amenities={apartment.amenities}
            />
        </main>
    );
}
