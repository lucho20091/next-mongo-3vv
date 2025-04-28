import Link from "next/link";
export default function Navbar() {
    return (
        <nav>
            <ul className="flex justify-between items-center bg-slate-800 px-8 py-3">
                <li><Link href="/" className="font-bold text-white">Home</Link></li>
                <li><Link href="/addTopic" className="bg-white p-2 rounded-xs">Add Topic</Link></li>
            </ul>
        </nav>
    )
}   
