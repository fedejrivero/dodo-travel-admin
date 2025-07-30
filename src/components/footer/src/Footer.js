import dodo from "../../../images/dodo.png";
import dodoTravel from "../../../images/dodoTravelWhite.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-first-content">
        <img src={dodoTravel} alt="dodoTravel" className="dodo-travel"/>
        <p>LEGAJO Nº 20223</p>
      </div>
      <div className="footer-content">
        <p>Te ayudamos a volar!</p>
        <img src={dodo} alt="dodo" className="dodo"/>
      </div>
    </footer>
  );
};

export default Footer; 