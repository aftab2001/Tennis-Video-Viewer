import React from 'react';
import styles from '../styles/Toolbar.module.css';
import SearchDropdown from './SearchDropdown';

const Toolbar = ({ setMatchData }) => {
    return (
        <div className={styles.toolbarContainer}>

        <div className={styles.toolbar}>
            {/* Toolbar content goes here */}
            <a className={styles.name} href="/">Match Viewer</a>
            <div className={styles.search}>

            <SearchDropdown   setMatchData={setMatchData} />
            </div>
            {/* Add more links or content as needed */}
        </div>
        </div>
    );
};

export default Toolbar;
