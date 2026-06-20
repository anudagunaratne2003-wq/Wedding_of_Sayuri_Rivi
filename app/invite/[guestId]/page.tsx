import guests from "@/data/guests.json";
import InvitationIntro from "@/components/InvitationIntro";
import MusicPlayer from "@/components/MusicPlayer";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ guestId: string }>;
}) {
  const { guestId } = await params;

  const guest = guests.find((g) => g.id === guestId);

  if (!guest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invitation Not Found
      </div>
    );
  }

  return (
    <>
      <MusicPlayer />
      <InvitationIntro guest={guest} />
    </>
  );
}
