import NavBar from '../../navBar/index';
import Footer from '../../footer';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logoWP from '../../../images/logoWP.jpg';

const Layout = ({ children }) => (
  <div className="app-container">
    <NavBar />
    {children}
    <Footer />
    <FloatingWhatsApp 
      phoneNumber="5493513719249"
      accountName="Dodo Travel"
      chatMessage="Hola, ¿en qué puedo ayudarte?"
      avatar={logoWP}
      allowEsc
      allowClickAway
      notification
      notificationSound
      placeholder="Hola, queria consultar sobre ..."
      statusMessage='Te ayudamos a volar!'
    />
  </div>
);

export default Layout;
