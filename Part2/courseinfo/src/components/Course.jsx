// Header component
const Header = (props) => <h2>{props.course}</h2>;

// Part component
const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

// Content component
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

// Total component
const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  return <strong>total of {total} exercises</strong>;
};

// Course Component
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
