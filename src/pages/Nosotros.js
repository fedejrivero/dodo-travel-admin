import dodo from "../images/dodo.png";
import useIsMobile from "../hooks/useIsMobile";

const Nosotros = () => {
    const isMobile = useIsMobile();
    return (
        <div className="page-content nosotros-page">
            <div className="nosotros-content">  

                <div className="nosotros-text">
                    <h2>  
                        Dodo Travel nació para acompañarte a volar.
                    </h2>
                    <h2>
                        Queremos que viajar sea simple y solo se trate
                        de conocer el mundo.
                    </h2>
                    <h2>
                    ¿Nuestro objetivo?
                    </h2>
                    <h2>
                    Acompañarte en cada paso.
                    </h2>
                    <h2>
                    Desde que soñás con el destino, hasta que
                    volvés con la valija llena de recuerdos.
                    </h2>
                    <h2>
                    Si el Dodo, un ave que no volaba, con un poco de ayuda
                    pudo animarse a hacerlo... vos también podés.
                    </h2>
                    <h2>
                        Y acá estamos para eso, te ayudamos a volar
                    </h2>
                    <h2>
                        Bienvenide a Dodo Travel.
                    </h2>
                    <h2>
                        Tu viaje arranca acá.
                    </h2>
                </div>
                {!isMobile && (
                    <div className="nosotros-image">
                        <img src={dodo} alt="dodo" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nosotros;
