import Banner from '../components/banner';
import plumas from '../images/plumas.png';
import Divider from '../components/divider';
import { Categories, Products } from '../components/sections/index';

const Home = () => (
  <div className="home-page" style={{ backgroundImage: `url(${plumas})`}}>
    <Banner />
    <h1>Bienvenidos a Dodo Travel</h1>
    {/* <p>Seleccione una seccion de la navegacion superior</p> */}
    
    <Categories />

    <Divider text="Consultanos por otros productos" />

    <Products />
  </div>
);

export default Home;
