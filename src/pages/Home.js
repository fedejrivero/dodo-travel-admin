import Banner from '../components/banner';
import plumas from '../images/plumas.png';
import { Sections } from '../components/sections';
import bannerImage from '../images/bannerImage.jpeg';

const Home = () => (
  <div className="home-page" style={{ backgroundImage: `url(${plumas})`}}>
    <Banner />
    <h1>Welcome to Dodo Travel</h1>
    <p>Select a section from the navigation above</p>
    
    <Sections sections={[{title: 'Section 1', description: 'Description 1', image: bannerImage}, {title: 'Section 2', description: 'Description 2', image: bannerImage}, {title: 'Section 3', description: 'Description 3', image: bannerImage}, {title: 'Section 4', description: 'Description 4', image: bannerImage}]} />

    <div className="divisor">
      <h2>Consultanos por otros productos </h2>
    </div>

    <div className="secondary-section">
      <Sections sections={[{title: 'Section 1', description: 'Description 1', image: bannerImage}, {title: 'Section 2', description: 'Description 2', image: bannerImage}, {title: 'Section 3', description: 'Description 3', image: bannerImage}, {title: 'Section 4', description: 'Description 4', image: bannerImage}, {title: 'Section 5', description: 'Description 5', image: bannerImage}]} />
    </div>
  </div>
);

export default Home;
