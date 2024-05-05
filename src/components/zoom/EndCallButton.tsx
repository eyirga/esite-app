import useStreamCall from "@/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "../ui/button";

export default function EndCallButton() {
    const call = useStreamCall()

    const { useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant()

    const participantIsChannelOwner = 
        localParticipant && 
        call.state.createdBy &&
        localParticipant.userId === call.state.createdBy.id

        if (!participantIsChannelOwner) {
            return null
        }

        return (
            <Button
                onClick={call.endCall}
                className="mx-auto block font-medium text-white hover:bg-red-300 bg-red-500 rounded-full"
            >
                <span className="p-4 text-sm">End all calls</span>
            </Button>
        )

}