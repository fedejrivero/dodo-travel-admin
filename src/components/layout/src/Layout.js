import NavBar from '../../navBar/index';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logoWP from '../../../images/logoWP.jpg';

const Layout = ({ children }) => (
  <div className="app-container">
    <NavBar />
    {children}
    <FloatingWhatsApp 
      phoneNumber="5493513719249"
      accountName="Dodo Travel"
      chatMessage="Hola, ¿en qué puedo ayudarte?"
      avatar={logoWP}
      allowEsc
      allowClickAway
      notification
      notificationSound
      notificationTitle="Hola, ¿en qué puedo ayudarte?"
      notificationSubTitle="Hola, ¿en qué puedo ayudarte?"
      notificationBadge="Hola, ¿en qué puedo ayudarte?"
      notificationBadgeColor="red"
      notificationBadgeBackgroundColor="red"
      notificationBadgeTextColor="white"
      notificationBadgeFontSize="12px"
      placeholder="Hola, queria consultar sobre ..."
      statusMessage='Te ayudamos a volar'
    />
  </div>
);

export default Layout;
