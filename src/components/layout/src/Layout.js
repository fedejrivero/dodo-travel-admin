import NavBar from '../../navBar/index';
import Footer from '../../footer';

const Layout = ({ children }) => (
  <div className="app-container">
    <NavBar />
    {children}
    <Footer />
  </div>
);

export default Layout;
