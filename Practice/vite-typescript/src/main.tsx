// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.tsx';

// import PropTypes from 'prop-types';

interface WelcomeProps {
  name: string;
}

// const Welcome = (props: WelcomeProps): JSX.Element => {
const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

// const Welcome = (props) => {
//   return <h1>Hello, {props.name}</h1>;
// };

// Welcome.propTypes = {
//   name: PropTypes.string,
// };

createRoot(document.getElementById('root')!).render(
  <Welcome name="Edem" />
  // <StrictMode>
  //   <App />
  // </StrictMode>
);
