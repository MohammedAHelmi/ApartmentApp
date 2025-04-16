export default function About({ about }: { about?: string }){
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">About This Unit</h2>
            <div>{about}</div>
        </div>
    )
}