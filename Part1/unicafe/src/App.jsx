import { useState } from "react";

// Button component
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// Header component
const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

// StatisticLine component (refactored to display table rows)
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Statistics component
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  // if no feedback is given, return a message
  if (all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // handleGoodClick function to increment good count
  const handleGoodClick = () => {
    // increment good count
    const updatedGood = good + 1;
    setGood(updatedGood);
  };

  // handleNeutralClick function to increment neutral count
  const handleNeutralClick = () => {
    // increment neutral count
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  // handleBadClick function to increment bad count
  const handleBadClick = () => {
    // increment bad count
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };
  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
