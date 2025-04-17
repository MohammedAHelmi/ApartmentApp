'use client'

import ApartmentCard from "@/components/ApartmentCard";
import ErrorComponent from "@/components/ErrorComponent";
import { HttpError } from "@/lib/Errors/HttpError";
import { getApartments } from "@/lib/getApartments";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Apartment } from "@/types/apartment";
import { useEffect,  useState } from "react";
import SearchBar from "@/components/SearchBar";
import DataLoader from "@/components/DataLoader";
import Spinner from "@/components/Spinner";


export default function HomePage() {
    const [apartments, setApartments] = useState<Apartment[]|null>(null);
    const [error, setError] = useState<Error | HttpError | null>(null);
    const [queryString, setQueryString] = useState<string>(useSearchParams()?.toString() || '')

    const router = useRouter();
    const pathname = usePathname(); 

    const handleSearch = function(term: string) {
        router.push(`${pathname}?term=${encodeURIComponent(term)}`);
        setQueryString(`term=${encodeURIComponent(term)}`);
    }

    useEffect(() => {
        getApartments(queryString)
        .then(data => {
            if (data instanceof Error) 
                setError(data);
            else setApartments(data);
        })
    }, [queryString]);


    if(error != null){
        const errorCode = error instanceof HttpError? error.statusCode: null;
        return <ErrorComponent message={error.message} code={errorCode}/>;
    }
    
    const spinner = <Spinner />;
    const cards = apartments?.map((apartement) => <ApartmentCard key={apartement.id} apartment={apartement}/>)

    const apartmentsSection = (
        <div className="max-w-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {
            cards != null 
            && cards.length > 0? 
                cards: 
                "Hmmm Looks Like There Are No Apartments Here..."
            }
        </div>
    )
    return (
        <div className="h-screen p-4 mx-auto shadow-lg overflow-hidden">
            <SearchBar
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                handleSubmit={handleSearch} 
            />
            <DataLoader data={apartments} fallback={spinner}>
                {apartmentsSection}
            </DataLoader>
        </div>
    )
}
