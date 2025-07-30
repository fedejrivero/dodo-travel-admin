import Banner from '../components/banner';
import plumas from '../images/plumas.png';
import { Sections } from '../components/sections';
import Divider from '../components/divider';
import { sections, sections2 } from '../components/sections/data/sections';

const Home = () => (
  <div className="home-page" style={{ backgroundImage: `url(${plumas})`}}>
    <Banner />
    <h1>Bienvenidos a Dodo Travel</h1>
    {/* <p>Seleccione una seccion de la navegacion superior</p> */}
    
    <Sections sections={sections} />

    <Divider text="Consultanos por otros productos" />

    <div className="secondary-section">
      <Sections sections={sections2} />
    </div>
  </div>
);

export default Home;
