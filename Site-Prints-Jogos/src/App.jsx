import Upload from "./components/Upload";
import Gallery from "./components/Gallery";
import "./index.css";

function App() {
  return (
    <div className="app">
      <h1 className="title">Prints de Jogos</h1>
      <Upload />
      <Gallery />
    </div>
  );
}

export default App;
