"use client"

import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MyMeetingsPage() {
    const {user} = useUser()

    const client = useStreamVideoClient()

    const [calls, setCalls] = useState<Call[]>()

    useEffect(() => {

        async function loadCalls() {

        if (!client || !user?.id) {
            return
        }
        
        const {calls} = await client.queryCalls({
            sort: [{field: "starts_at", direction: -1}],
            filter_conditions: {
                starts_at: {$exists: true},
                $or: [
                    { created_by_user_id: user.id },
                    {memebers: { $in: [user.id] } }
                ]
            }
        })

        setCalls(calls)
    }
    
        loadCalls()
        
    },[client, user?.id])

    return <div className="space-y-3">
        <h1 className="text-slate-300 text-center text-2xl font-bold">Meeting List</h1>
        {!calls && <Loader2 className="mx-auto animate-spin" />}        
        {calls?.length === 0 && <p>No meetings found</p>}
        <ul className="list-inside list-disc space-y-2 bg-slate-800 text-white p-4 rounded-xl">
            {calls?.map((call) => <MeetingItem key={call.id} call={call} />)}
        </ul>
    </div>
}

interface MeetingItemProps {
    call: Call
}

function MeetingItem({call}: MeetingItemProps) {
    const meetingLink = `/zoom/meeting/${call.id}`

    const isInFuture = call.state.startsAt && new Date(call.state.startsAt) > new Date()

    const hasEnded = !!call.state.endedAt

    return <li className="bg-slate-900 p-2">
        <Link 
            href={meetingLink}
            className="hover:underline text-slate-300"
        >
            {call.state.startsAt?.toLocaleString()}
            {isInFuture && " (Upcoming"}
            {hasEnded && " (Ended)"}
        </Link>
        <p className="">
            {call.state.custom.description}
        </p>
    </li>
}
