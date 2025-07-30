import Title from "../../title";

const Section = ({title, image}) => (
  <section 
    className="section"
    style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <Title text={title} />
  </section>
);

export default Section;
