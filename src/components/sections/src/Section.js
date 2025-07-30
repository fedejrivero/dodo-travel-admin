import Title from "../../title";

const Section = ({title, description, image}) => (
  <section className="section" style={{ backgroundImage: `url(${image})`}}>
    <Title text={title} />
  </section>
);

export default Section;
