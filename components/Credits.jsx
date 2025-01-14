import "./Credits.css";

const Credits = () => {
  return (
    <div className="Credits">
      <h3>Contributors</h3>
      {/* KYLE */}
      <b>Kyle McParland</b>
      <div className="links">
        <a href="https://www.linkedin.com/in/kyle-mcparland/">
          LinkedIn kyle-mcparland
        </a>
        <a href="https://github.com/kylemcparland">GitHub /kylemcparland</a>
      </div>

      {/* JON */}
      <b>Jon Hiebert</b>
      <div className="links">
        <a href="https://www.linkedin.com/in/jonathan-h-8103b2289/">
          LinkedIn jonathan-h-8103b2289
        </a>
        <a href="https://github.com/jon-jh">GitHub /jon-jh</a>
      </div>

      {/* BEN */}
      <b>Ben Hallam</b>
      <div className="links">
        <a href="https://www.linkedin.com/in/benjamin-hallam-195a10309/">
          LinkedIn benjamin-hallam-195a10309
        </a>
        <a href="https://github.com/bendhallam">GitHub /bendhallam</a>
      </div>
    </div>
  );
};

export default Credits;
