import React, { useState } from 'react';
import cx from 'classnames';
import Button from './Button';
import styles from './Buttons.module.sass';
const buttons = [
  { id: 1, btnContent: 'Yes', parContent: 'The Domain should exactly match the name' },
  { id: 2, btnContent: 'Yes', parContent: 'But minor variatins are allowed (Recommended)' },
  { id: 3, btnContent: 'No', parContent: 'I am only looking for a name, not a Domain' },
];

const ButtonGroup = () => {
  const [idBtn, setIdBtn] = useState(0);
  const renderBtn = button => {
    const classNames = cx(styles.item, { [styles.active]: button.id === idBtn });
    return (
      <Button
        key={button.id}
        setActive={setIdBtn}
        className={classNames}
        button={button}
      />
    );
  };
  return <section className={styles.container}>{buttons.map(renderBtn)}</section>;
};

export default ButtonGroup;
