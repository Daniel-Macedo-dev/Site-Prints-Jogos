import Upload from "../components/Upload";
import Gallery from "../components/Gallery";

export default function HomePage() {
  return (
    <>
      <div className="mb-4">
        <Upload />
      </div>
      <Gallery />
    </>
  );
}
