export default function FinalVideo() {
  return (
    <main className="w-screen h-screen bg-black">
      <video
        src="/animations/finalvideo.mp4"
        controls
        autoPlay
        className="w-full h-full object-cover"
      />
    </main>
  );
}
