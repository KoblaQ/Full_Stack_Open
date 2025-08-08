const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  return <strong>total of {total} exercises</strong>;
};

export default Total;
