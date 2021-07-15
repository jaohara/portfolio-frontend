
// maybe pass in a value for a key?
const Project = ({
  name = "Some Project",
  description = "Some sort of project, I dunno."
}) => {
  return(
    <div className="project">
      <div className="project-meta">
        <h1>{ name }</h1>

        <div className="project-meta-description">
          { description }
        </div>
      </div>
    </div>
  );
}

export default Project;