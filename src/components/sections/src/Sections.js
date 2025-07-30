import Section from "./Section";

const Sections = ({sections}) => (
  <div className="sections">
    {sections.map((section) => (
      <Section key={section.id} title={section.title} description={section.description} image={section.image} />
    ))}
  </div>
);

export default Sections;
