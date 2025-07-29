import bannerImage from '../../../images/bannerImage.jpeg';
import bannerLogo from '../../../images/bannerLogo.png';

const Banner = () => (
  <section style={{ backgroundImage: `url(${bannerImage})` }}>
      <img src={bannerLogo} alt="banner" className="bannerIMG" />
  </section>
);

export default Banner;
