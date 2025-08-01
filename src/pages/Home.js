import Banner from '../components/banner';
import Divider from '../components/divider';
import { Categories, Products } from '../components/sections/index';

const Home = () => (
  <div className="page-content home-page" >

    <h1>Bienvenidos a Dodo Travel</h1>
    {/* <p>Seleccione una seccion de la navegacion superior</p> */}
    
    <Categories />

    <Divider text="Consultanos por otros productos" />

    <Products />
  </div>
);

export default Home;
