import { Component } from "preact";

export { CursorFluidShader };

function loadShader() {
  const canvas = document.querySelector("canvas");
  canvas.width = Math.max(
    window.innerWidth,
    document.documentElement.clientWidth
  );
  canvas.height = Math.max(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  import("../lib/cursorFluidShader.js");
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
