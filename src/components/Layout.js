import NavBar from './NavBar';

const Layout = ({ children }) => (
  <div className="app-container">
    <NavBar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

export default Layout;
