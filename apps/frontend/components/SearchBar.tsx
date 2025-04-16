'use client'
import { useState } from "react";

export default function SearchBar({ className, handleSubmit }: { className?: string | undefined, handleSubmit: (term: string) => void }){
    const [searchTerm, setSearchTerm] = useState<string>('')
    return (
        <input
            type="text"
            className={className}
            placeholder="Search Unit By Name, Unit Number, Or Project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key !== 'Enter')
                    return;
                handleSubmit(searchTerm);
            }}
        />
    )
}