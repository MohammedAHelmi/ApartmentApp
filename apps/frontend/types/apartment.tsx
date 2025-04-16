export interface Apartment {
    id: number,
    name: string,
    unitNumber: number,
    size: number,
    beds: number,
    baths: number,
    price: number,
    address: Address,
    pictures: string[],
    finishing: string,
    delivery: string,
    about: string,
    amenities: string[]
}

export interface Address {
    blockNumber: number,
    project: {
        name: string,
        developer?: string
    },
    city: string,
    province: string,
    location?: {
        lat: number;
        long: number;
    }
}