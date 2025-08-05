import { useState } from "react";

// Button component
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// StatisticLine component
const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

// Statistics component
const Statistics = ({ good, neutral, bad }) => {
  // if no feedback is given, return a message
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text={"all"} value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={(good - bad) / (good + neutral + bad) || 0}
      />
      <StatisticLine
        text="positive"
        value={(good / (good + neutral + bad)) * 100 || 0}
      />
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
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
