import PropTypes from 'prop-types';
import React from 'react';

import styles from './watermark.css';
import logo from './logo-teky.png';

const Watermark = props => (
    <img
        className={styles.spriteImage}
        src={logo}
    />
);

Watermark.propTypes = {
    costumeURL: PropTypes.string
};

export default Watermark;
