import { useState } from "react";
import "./App.css";
import Recipe from "./Recipe";
import LoadingBar from "react-top-loading-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp, fas } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [progress, setProgress] = useState(0);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="App">
      <LoadingBar
        color="#01834b"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <p className="title">Food Recipe</p>
      <Recipe setProgress={setProgress} />
      <div className="scroll-top" onClick={scrollTop}>
        <FontAwesomeIcon icon={faAngleDoubleUp} color="#398967" />
      </div>
    </div>
  );
}

export default App;
