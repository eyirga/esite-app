"use client"

import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient, Call, MemberRequest } from "@stream-io/video-react-sdk"
import { Copy, Loader2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getUserIds } from "@/actions/stream.actions"
import Link from "next/link"

const CreateMeetingPage = () => {

    const [descriptionInput, setDescriptionInput] = useState("")
    const [startTimeInput, setStartTimeInput] = useState("")
    const [participantsInput, setParticipantsInput] = useState("")

    const [call, setCall] = useState<Call>()

    const client = useStreamVideoClient()

    const { user } = useUser()

    async function createMeeting() {
        if (!client || !user) {
            return;
        }

        try {
            const id = crypto.randomUUID()

            const callType = participantsInput ? "private-meeting" : "default"

            const call = client.call(callType, id)

            const memeberEmails = participantsInput
            .split(",")
            .map(email => email.trim())

            const memberIds = await getUserIds(memeberEmails)

            const members: MemberRequest[] = memberIds
            .map(id => ({user_id: id, role: "call_member"}))
            .concat({user_id: user.id, role: "call_member"})
            .filter((v, i, a) => a.findIndex((v2) => v2.user_id === v.user_id) === i)

            const starts_at = new Date(startTimeInput || Date.now()).toISOString()

            await call.getOrCreate({
                data: {
                    starts_at,
                    members,
                    custom: {description: descriptionInput}
                }
            })

            setCall(call)
        } catch (error) {
            console.log(error)
            alert("Something went wrong. Please try later.")
        }
    }

    if (!client || !user) {
        return <Loader2 className="mx-auto animate-spin" />
    }

    return (
        <div className='flex flex-col items-center space-y-6 bg-slate-800 rounded-xl shadow border-4 border-slate-900 shadow-slate-200'>
            <div className="p-4">
                <h1 className="uppercase text-center text-2xl font-bold text-slate-300 p-4">Welcome {user.firstName}</h1>
                <div className="w-80 mx-auto space-y-6 rounded-xl bg-slate-700 p-5 text-white gap-4">
                    <h2 className="text-xl font-bold">Create a new meeting</h2>
                    <DescriptionInput
                        value={descriptionInput}
                        onChange={setDescriptionInput}
                    />
                    <StartTimeInput
                        value={startTimeInput}
                        onChange={setStartTimeInput}
                    />
                    <ParticipantsInput
                        value={participantsInput}
                        onChange={setParticipantsInput}
                    />
                    <Button className="w-full bg-blue-600 rounded-xl text-white hover:bg-blue-300" onClick={createMeeting}>
                        Create meeting
                    </Button>
                </div>
                {call && <MeetingLink call={call} /> }
            </div>
        </div>
    )
}

export default CreateMeetingPage



interface DescriptionInputProps {
    value: string,
    onChange: (value: string) => void
}

function DescriptionInput({value, onChange}: DescriptionInputProps) {
    
    const [active, setActive] = useState(false)

    return (
        <div className="space-y-2">
            <div className="font-medium">
                Meeting info:
            </div>
            <label className="flex items-center gap-5">
                <input 
                    type="checkbox"
                    checked={active}
                    onChange={(e) => {
                        setActive(e.target.checked)
                        onChange("")
                    }}
                />
                Add description
            </label>
            {
                active && (
                    <label className="block space-y-1">
                        <span className="font-meduim">Description</span>
                        <textarea 
                            value={value} 
                            onChange={(e) => onChange(e.target.value)} 
                            maxLength={500} 
                            className="w-full rounded-md border border-gray-300 p-2 bg-slate-400 capitalize "
                        />

                    </label>
                )
            }
        </div>
    )
}

interface StartTimeInputProps {
    value: string,
    onChange: (value: string) => void
}

function StartTimeInput({value, onChange}: StartTimeInputProps) {

    const [active, setActive] = useState(false)

    const dateTimeLocalNow = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60_000
    ).toISOString().slice(0, 16)

    return (
        <div className="space-y-2">
            <div className="font-medium">Meeting start:</div>
            <label className="flex items-center gap-1.5">
                <input 
                    type="radio"
                    checked={!active}
                    onChange={() => {
                        setActive(false)
                        onChange("")
                    }}
                    className=""
                />
                Start meeting immediately
            </label>
            <label className="flex items-center gap-1.5">
                <input 
                    type="radio"
                    checked={active}
                    onChange={() => {
                        setActive(true)
                        onChange(dateTimeLocalNow)
                    }}
                />
                Start meeting at date/time
            </label>
            {
                active && (
                    <label className="block space-y-1">
                        <span className="font-medium">Start time</span>
                        <input 
                            type="datetime-local" 
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            min={dateTimeLocalNow}
                            className="w-full rounded-md border border-gray-300 p-2 bg-slate-400"
                        />
                    </label>
                )
            }
        </div>
    )
}

interface ParticipantsInputProps {
    value: string,
    onChange: (value: string) => void
}

function ParticipantsInput({value, onChange}: ParticipantsInputProps) {
    const [active, setActive] = useState(false)

    return (
        <div className="space-y-2">
            <div className="font-medium">Participants:</div>
            <label className="flex items-center gap-1.5">
                <input 
                    type="radio" 
                    checked={!active}
                    onChange={() => {
                        setActive(false)
                        onChange("")
                    }}
                />
                Everyone with link can join
            </label>
            <label className="flex items-center gap-1.5">
                <input 
                    type="radio" 
                    checked={active}
                    onChange={() => {
                        setActive(true)
                        onChange("")
                    }}
                />
                Private meeting
            </label>
            {
                active && (
                    <label className="block space-y-1">
                        <span className="font-medium">Participant emails</span>
                        <textarea 
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Enter participant email addresses separated by comms"
                            className="w-full rounded-md border border-gray-300 p-2 bg-slate-400 text-white"
                        />
                    </label>
                )
            }                    
        </div>
    )
}

interface MeetingLinkProps {
    call: Call
}

function MeetingLink({ call }: MeetingLinkProps) {
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/zoom/meeting/${call.id}`

    return (
        <div className="text-center text-white text-xs mt-4 bg-slate-400 rounded">
            <div className="p-4 flex items-center gap-3">
                <span className="font-bold bg-slate-700 p-2 rounded">
                    Invitation link:{" "}
                    <Link href={meetingLink} className="font-medium">
                        {meetingLink}
                    </Link>
                </span>
                <button 
                    title="Copy invitation link"
                    onClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        alert("Copied to clipboard")
                    }}
                >
                    <Copy />
                </button>
            </div>
            <a 
                href={getMailToLink(
                    meetingLink,
                    call.state.startsAt,
                    call.state.custom.description
                )}
                target="_blank"
                className="text-blue-700 hover:underline text-sm font-bold "
            >
                Send email invitation
            </a>
        </div>
    )
}

function getMailToLink(
    meetingLink: string,
    startsAt?: Date,
    description?: string
) {

    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  
    const startDateFormatted = startsAt
    ? startsAt.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short"
    })
    : undefined

    const subject = "Join the meeting" + (startDateFormatted ? ` on ${startDateFormatted}` : "")

    const body = `Click here to join the meeting: ${meetingLink}.` + 
    (startDateFormatted ? `\n\nThe meeting starts on ${startDateFormatted}.` : "") + 
    (description ? `\n\nDescription: ${description}` : "")

    console.log(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}