import Image from "next/image";
import CreateMeetingPage from "./CreateMeetingPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      <div className="">
        <CreateMeetingPage />
      </div>
    </main>
  );
}
