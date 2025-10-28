import Upload from "../components/Upload";
import Gallery from "../components/Gallery";

export default function HomePage() {
  const isOffline = window.location.protocol === "file:";

  return (
    <>
      <div className="mb-4">
        <Upload />
      </div>
      <Gallery useMock={isOffline} />
    </>
  );
}
