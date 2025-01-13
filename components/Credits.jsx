import "./Credits.css";

const Credits = () => {
  return (
    <div className="Credits">
      <h3>Contributors:</h3>
      {/* KYLE */}
      <b>Kyle McParland</b>
      <div className="links">
        <a href="https://www.linkedin.com/in/kyle-mcparland/">LinkedIn</a>
        <a href="https://github.com/kylemcparland">GitHub</a>
      </div>

      {/* JON */}
      <b>Jon Hiebert</b>
      <div className="links">
        <a href="https://www.linkedin.com/in/jonathan-h-8103b2289/">LinkedIn</a>
        <a href="https://github.com/jon-jh">GitHub</a>
      </div>

      {/* BEN */}
      <b>Ben Hallam</b>
      <div className="links">
        <a href="https://www.linkedin.com/in/benjamin-hallam-195a10309/">
          LinkedIn
        </a>
        <a href="https://github.com/bendhallam">GitHub</a>
      </div>
    </div>
  );
};

export default Credits;
