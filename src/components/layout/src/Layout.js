import NavBar from '../../navBar/index';

const Layout = ({ children }) => (
  <div className="app-container">
    <NavBar />
    {children}
  </div>
);

export default Layout;
