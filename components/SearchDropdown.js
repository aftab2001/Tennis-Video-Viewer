import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { collection, getDocs } from 'firebase/firestore';
import db from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';

const SearchDropdown = ({ setMatchData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownData, setDropdownData] = useState([]);

    // Fetch the matches from the database and format them for the dropdown
    useEffect(() => {
        const fetchMatches = async () => {
            const querySnapshot = await getDocs(collection(db, 'matches'));
            const matches = querySnapshot.docs.map((doc) => doc.data());
            setDropdownData(formatOptions(matches));
        };

        fetchMatches();
    }, []);

    const handleDropdownItemClick = (selectedOption) => {
        setMatchData(selectedOption.value);
        setSearchTerm(selectedOption);
    };

    const formatOptions = (data) => {
        return data.map((item) => ({
            value: item,
            label: item.name
        }));
    };
    const customStyles={
        option:(provided, state) =>({
            ...provided,
            borderBottom:'1px solid #DAEBFE',
            minWidth:'300px',
            color:state.isSelected?"white":"black",
            backgroundColor:"white",
            backgroundColor:state.isSelected?"#005587":
            "DAEBFE",
            ':hover':{
                backgroundColor:'#DAEBFE',
                
            }
        })
    }
    return (
        <div >
            <Select
                placeholder="Search for a tennis match..."
                styles={customStyles}
                value={searchTerm}
                onChange={handleDropdownItemClick}
                options={dropdownData}
                className={styles.searchDropdown}
            />
            
        </div>
    );
}

export default SearchDropdown;