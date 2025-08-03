import { useState } from "react";

// Button component
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// Statistics component
const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad) || 0}</p>
      <p>positive {(good / (good + neutral + bad)) * 100 || 0} %</p>
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
