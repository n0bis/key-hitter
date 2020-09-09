/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HID from 'node-hid';

import styles from './Keyboard-hid.css';
import routes from '../../constants/routes.json';

export default function KeyboardHID() {
  // const [keyCodePressed, setKeyCodePressed] = useState(0);
  useEffect(() => {
    console.log(`productId: ${0x4256}`, `vendorId: ${0xcb10}`);
    const device = new HID.HID(0xcb10, 0x4256);
    console.log(device);
    device.on('data', (data: unknown) => {
      console.log(data);
    });

    // const characters = new KeyboardCharacters({ vendorId: 0xcb10, productId: 0x4256 });
    // console.log(characters)
    // characters.on('data', (data) => console.log(data));
  });

  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <h1>Keyboard HID</h1>
      {HID.devices()
        .filter(
          (device: { productId: number; vendorId: number }) =>
            device.productId === 0x4256 && device.vendorId === 0xcb10
        )
        .map(
          (device: {
            vendorId: React.ReactNode;
            productId: React.ReactNode;
            path: React.ReactNode;
          }) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div>
                <p>{device.vendorId}</p>
                <p>{device.productId}</p>
                <p>{device.path}</p>
              </div>
            );
          }
        )}
    </div>
  );
}
