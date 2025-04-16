import { Apartment } from "@/types/apartment";
import { HttpError } from "./Errors/HttpError";

export async function getApartment(id: number): Promise<Apartment | Error>{
    const url = process.env.NODE_ENV === 'production'? process.env.BACKEND_CONTAINER_URL: process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${url}/${id}`);

    if (!res.ok) {
        const msg = typeof res.type === 'string'? await res.text(): res.statusText;
        return new HttpError(msg, res.status);
    }

    return await res.json();
}