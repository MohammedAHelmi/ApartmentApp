import Link from 'next/link';
import Gallary from './apartment/Gallary';
import { Apartment } from '@/types/apartment';
import InfoBar from './apartment/InfoBar';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
    return (
        <div className='max-w-4xl p-1 mx-auto bg-white shadow-sm hover:bg-gray-100 rounded-2xl'>
            <Gallary images={apartment.pictures}/>
            <Link href={`apartment/${apartment.id}`}>
                <InfoBar 
                    price={apartment.price} 
                    size={apartment.size} 
                    beds={apartment.beds} 
                    baths={apartment.baths} 
                    projectName={apartment.address.project.name ?? apartment.address.project}
                    city={apartment.address.city}
                    province={apartment.address.province}
                /> 
            </Link>
        </div>
    )
}