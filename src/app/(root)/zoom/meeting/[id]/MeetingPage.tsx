"use client"

import { Button } from '@/components/ui/button'
import PermissionPrompt from '@/components/zoom/PermissionPrompt'
import useLoadCall from '@/hooks/useLoadCall'
import useStreamCall from '@/hooks/useStreamCall'
import { useUser } from '@clerk/nextjs'
import { CallingState, DeviceSettings, SpeakerLayout, StreamCall, StreamTheme, VideoPreview, useCall, useCallStateHooks, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AudioVolumeIndictor from '@/components/zoom/AudioVolumeIndicator'
import FlexibleCallLayout from '@/components/zoom/FlexibleCallLayout'
import RecordingsList from '@/components/zoom/RecordingsList'

interface MeetingPageProps {
    id: string
}

export default function MeetingPage({id}: MeetingPageProps) {

    const {user, isLoaded: userLoaded} = useUser()
    
    const {call, callLoading} = useLoadCall(id)

    const client = useStreamVideoClient()

    if (!userLoaded || callLoading) {
        return <Loader2 className='mx-auto animate-spin' />
    }

    if (!call) {
        return <p className='text-slate-300 text-center font-bold'>Call not found</p>
    }

    const notAllowedToJoin = call.type === "private-meeting" && 
    (!user || !call.state.members.find(m => m.user.id === user.id))

    if (notAllowedToJoin) {
        return (
            <p className='text-center font-bold text-red-600'>
                You are not allowed to view this meeting
            </p>
        )
    }

    return (
        <StreamCall call={call}>
            <StreamTheme className='space-y-3'>
                <StreamTheme>
                    <MeetingScreen />
                </StreamTheme>
            </StreamTheme>
        </StreamCall>
    )
}

function MeetingScreen() {
    const call = useStreamCall()
    const {useCallEndedAt, useCallStartsAt} = useCallStateHooks()

    const callEndedAt = useCallEndedAt()
    const callStartsAt = useCallStartsAt()

    const [setupComplete, setSetupComplete] = useState(false)

    async function handleSetupComplete() {
        call.join()
        setSetupComplete(true)
    }

    const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date()

    const callHasEnded = !!callEndedAt

    if (callHasEnded) {
        return <MeetingEndedScreen />
    }

    if (callIsInFuture) {
        return <UpcommingMeetingScreen />
    }

    const description = call.state.custom.description

    return <div className='text-slate-200 space-y-2'>
        {description && (
            <p className='text-center text-slate-300'>
                Meeting description: <span className='font-bold text-slate-300'>{description}</span>
            </p>
        )}
        {setupComplete ? (
            <CallUI />
        ) : (
            <SetupUI onSetupComplete={handleSetupComplete} />
        )}
    </div>
}

interface SetupUIProps {
    onSetupComplete: () => void
}

function SetupUI({onSetupComplete}: SetupUIProps) {
    const call = useStreamCall()
    const {useMicrophoneState, useCameraState} = useCallStateHooks()

    const micState = useMicrophoneState()
    const camState = useCameraState()

    const [micCamDisabled, setMicDisabled] = useState(false)
    
    useEffect(() =>{
        if (micCamDisabled) {
            call.camera.disable()
            call.microphone.disable()
        } else {
            call.camera.enable()
            call.microphone.enable()
        }

    },[micCamDisabled, call])

    if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
        return <PermissionPrompt />
    }

    return <div className='flex flex-col items-center gap-3'>
        <h1 className='text-center text-slate-300 text-2xl font-bold'>Setup</h1>
        <VideoPreview />
        <div className='flex h-16 items-center gap-3'>
            <AudioVolumeIndictor />
            <DeviceSettings />
        </div>
        <label 
            className='flex items-center gap-2 font-medium text-slate-300'
        >
            <input type="checkbox" 
                checked={micCamDisabled}
                onChange={(e) => setMicDisabled(e.target.checked)}
            />
            Join with mic and camera off
        </label>
        <Button 
            className='bg-blue-600 hover:bg-blue-400 rounded-full'
            onClick={onSetupComplete}
        >
            Join meeting
        </Button>
    </div>
}

function CallUI() {
    const {useCallCallingState} = useCallStateHooks()

    const callingState = useCallCallingState()

    if (callingState !== CallingState.JOINED) {
        return <Loader2 className='mx-auto animate-spin' />
    }

    return <FlexibleCallLayout />
}

function UpcommingMeetingScreen() {
    const call = useStreamCall()

    return <div className='flex flex-col items-center gap-6 text-slate-200'>
        <p>
            This meeting has not started yet. It will start at{" "}
            <span className='font-bold'>
                {call.state.startsAt?.toLocaleString()}
            </span>
        </p>
        {call.state.custom.description && (
            <p>
                Description:{" "}
                <span className='font-bold'>
                    {call.state.custom.description}
                </span>
            </p>
        )}
        <Link href='/zoom'>
            <Button className='bg-blue-600 hover:bg-blue-400 rounded-full' >Back to Zoom</Button>
        </Link>
    </div>
}

function MeetingEndedScreen() {
    return (
        <div className='flex flex-col items-center gap-6'>
            <p className='font-bold text-red-400'>This meeting has ended</p>
            <Link href={"/zoom"}>
                <Button className='bg-blue-600 hover:bg-blue-400 rounded-full text-white'>
                    Back to Zoom
                </Button>
            </Link>
            <div className='space-y-3 rounded-xl  bg-slate-800'>
                <div className='p-4'>
                    <h2 className='text-center text-xl font-bold text-slate-300'>Recording List</h2>
                    <RecordingsList />
                </div>
            </div>
        </div>
    )
}