import { Apartment } from "@/types/apartment";
import { HttpError } from "./Errors/HttpError";

export async function getApartments(queryString: string): Promise<Apartment[] | Error>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/list?${queryString}`);

    if (!res.ok) {
        const msg = typeof res.type === 'string'? await res.text(): res.statusText;
        return new HttpError(msg, res.status);
    }

    return await res.json();
}