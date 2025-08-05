import dodo from "../../../images/dodo.png";
import dodoTravel from "../../../images/dodoTravelWhite.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={dodoTravel} alt="dodoTravel" className="dodo-travel"/>
      
      </div>
      <div className="footer-content">
        <div className="footer-text">
          <p>Te ayudamos a volar!</p>
          <img src={dodo} alt="dodo" className="dodo"/>
        </div>
      </div>
      <div className="footer-content">
        <p>LEGAJO Nº 20223</p>
        <p>CUIT 30-71903887-1</p>
      </div>
    </footer>
  );
};

export default Footer; 