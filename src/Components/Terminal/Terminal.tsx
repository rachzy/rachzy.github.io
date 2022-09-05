import "./Terminal.css";

const Terminal = () => {
  return (
    <div className="terminal">
      <div className="fakeMenu">
        <div className="fakeButtons fakeClose"></div>
        <div className="fakeButtons fakeMinimize"></div>
        <div className="fakeButtons fakeZoom"></div>
      </div>
      <div className="fakeScreen">
        <p id="command-line"></p>
        <p id="output-line"></p>
      </div>
    </div>
  );
};

export default Terminal;
