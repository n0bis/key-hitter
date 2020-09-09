import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={routes.KEYBOARDIOHOOK}>to Keyboard IOhook</Link>
      <Link to={routes.KEYBOARDHID}>to Keyboard HID</Link>
    </div>
  );
}