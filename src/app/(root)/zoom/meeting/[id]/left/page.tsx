import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PageProps {
    params: { id: string }
}

export default function Page({params: {id}}: PageProps) {
    return <div className="flex flex-col items-center gap-3">
        <p className="text-slate-300 font-bold">You left this meeting.</p>
        <Link 
            href={`/zoom/meeting/${id}`}
            className={cn(Button, "bg-green-500 hover:bg-green-400 rounded-full")}
        >
            <span className="text-white text-sm p-4">Rejoin</span>
        </Link>
    </div>
}