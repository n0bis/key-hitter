import React, { useState, useEffect } from 'react';
import iohook from 'iohook';
import clsx from 'clsx';
import styles from './Keyboard-iohook.css';

import keyCodes from '../../keys.json';
import keyboardLayout from '../../iris-rev4-qmk.json';
import keyboardKeys from '../../keyboard-layers.json';

export default function KeyboardIOHook() {
  const [keyCodePressed, setKeyCodePressed] = useState('');
  const [layer, setLayer] = useState(0);
  iohook.start();
  useEffect(() => {
    iohook.on('keydown', ({ keycode }) => {
      // console.log(keycode);
      // console.log(keyCodes[keycode] || '');
      // keyPressed = keyCodes[keycode]
      setKeyCodePressed(keyCodes[keycode].toLowerCase() || '');
      setTimeout(() => setKeyCodePressed(''), 400);
    });
  });
  // console.log(`keycode-pressed: ${keyCodePressed}`);
  const formatKeyName = (text: string) => text.replace('KC_', '').toLowerCase();
  const onClick = (index: React.SetStateAction<number>) => setLayer(index);
  const renameKeys = (text: string) => {
    const nameObj = {
      bspc: 'Bksp',
      bsls: 'Del',
      lgui: '⌘',
      down: '↓',
      up: '↑',
      left: '←',
      right: '→',
      ralt: '⌥',
      lalt: '⌥',
      comm: ',',
      dot: '.',
      slsh: '-',
      scln: 'æ',
      quot: 'ø',
      tild: '~',
      exlm: '!',
      at: '"',
      hash: '#',
    };
    return text
      .replace(
        new RegExp(Object.keys(nameObj).join('|'), 'gi'),
        (matched) => nameObj[matched.toLowerCase()]
      )
      .toUpperCase();
  };
  /*
   <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
  */
  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <button type="button" onClick={() => onClick(0)}>
          0
        </button>
        <button type="button" onClick={() => onClick(1)}>
          1
        </button>
      </div>
      <div style={{ display: 'block' }}>
        {keyboardLayout.keyboards['keebio/iris/rev4'].layouts.LAYOUT.layout.map(
          (key, index) => (
            <div
              className={clsx(
                styles.key,
                `${
                  keyCodePressed ===
                  formatKeyName(keyboardKeys.layers[layer][index])
                    ? styles.key_selected
                    : ''
                }`
              )}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{
                top: `${key.y * 45}px`,
                left: `${key.x * 45}px`,
              }}
            >
              <div className={styles.keycap}>
                {renameKeys(formatKeyName(keyboardKeys.layers[layer][index]))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
