import { Component } from "preact";

export { CursorFluidShader };

function loadShader() {
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const script = document.createElement("script");
  script.src = "/cursorFluidShader.js";
  script.async = true;

  document.body.appendChild(script);
}

class CursorFluidShader extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    loadShader();
  }

  render() {
    return <canvas className="absolute"></canvas>;
  }
}
