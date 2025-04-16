import { LuDollarSign, LuBedDouble, LuRuler, LuBath, LuMapPin } from "react-icons/lu";

interface InfoBarProps {
    size: number,
    beds: number,
    baths: number,
    price: number,
    unitNumber?: number,
    blockNumber?: number,
    projectName: string,
    city: string,
    province: string,
}

export default function CardInfo({
  price,
  size,
  beds,
  baths,
  unitNumber,
  blockNumber,
  projectName,
  city,
  province,
}: InfoBarProps){
    const address = `${unitNumber?`${unitNumber}, `: ''} ${blockNumber? `block ${blockNumber}, `: ''} ${projectName}, ${city}, ${province}`;
    return (
        <div className="mt-4 pl-2 pr-2 pb-2 grid grid-cols-1">

            <div className="text-xl flex items-center gap-2">
                <LuDollarSign className="w-5 h-5" />
                <span className="">{price.toLocaleString()}</span>
            </div>

            <div className="flex p-1 justify-between">
            
                <div className="flex items-center gap-1">
                    <LuRuler className="w-4 h-4"/>
                    <span className="font-bold">{size}</span> 
                    <span className="text-gray-600 text-sm">
                        m²
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <LuBedDouble className="w-4 h-4" />
                    <span className="font-bold">
                        {beds}
                    </span>
                </div>
            
                <div className="flex items-center gap-1">
                    <LuBath className="w-4 h-4" />
                    <span className="font-bold">
                        {baths}
                    </span>
                </div>
            </div>

            <div className="flex items-center text-gray-600 gap-2">
                <LuMapPin className="w-4 h-4" />
                <span>{address}</span>
            </div>
        </div>
    )
}