import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload/Upload";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
