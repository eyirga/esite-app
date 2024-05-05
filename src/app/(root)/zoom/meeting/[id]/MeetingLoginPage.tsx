import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function MeetingLoginPage() {
    return <div className="mx-auto w-fit space-y-3">
        <h1 className="text-slate-300 text-center font-bold">Join Meeting</h1>
        <ClerkLoaded>
            <div className="flex gap-4">
                <SignInButton>
                    <Button className="w-44 rounded-full bg-blue-500 text-white">Sign in</Button>
                </SignInButton>
                <Link href="?guest=true">
                    <Button className="w-44 rounded-full bg-blue-500 text-white">Continue as guest</Button>
                </Link>
            </div>
        </ClerkLoaded>
        <ClerkLoading>
            <Loader2 className="mx-auto animate-spin" />
        </ClerkLoading>
    </div>
}