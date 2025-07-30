import bannerImage from '../../../images/bannerImage.jpeg';
import bannerLogo from '../../../images/bannerLogo.png';

const Banner = () => (
  <section className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
      <img src={bannerLogo} alt="banner" className="bannerLogo" />
  </section>
);

export default Banner;
