import { use } from "react";
import { useState } from "react";

// Button component
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// Most votes anecdote component
const MostVotes = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...Object.values(votes));
  const maxVotesKey = Object.keys(votes).find((key) => votes[key] === maxVotes);
  const maxVotesAnecdote =
    anecdotes[
      Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b))
    ];

  if (maxVotes === 0) {
    return <div>No votes yet</div>;
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{maxVotesAnecdote}</p>
      <p>has {votes[maxVotesKey]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleNextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const copy = { ...votes };
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="Next Anecdote" />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
