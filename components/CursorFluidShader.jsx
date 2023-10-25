import { Component } from "preact";

export { CursorFluidShader };

class CursorFluidShader extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "/cursorFluidShader.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return <canvas></canvas>;
  }
}
