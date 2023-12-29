import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import '../services/initializeFirebase.js'; // Initialize Firebase on the client side

import SearchDropdown from '../components/SearchDropdown';
import VideoPlayer from '../components/VideoPlayer';
import FilterList from '../components/FilterList';
import PointsList from '../components/PointsList';
import Toolbar from '../components/Toolbar.js';

export default function Home() {

  const videoRef = useRef(null);
  const [matchData, setMatchData] = useState(null);
  const [filterList, setFilterList] = useState([]);

  // Function to jump to a specific time in the video, given in milliseconds, via the YouTube Player API
  const handleJumpToTime = (time) => {
    if (videoRef.current) {
      videoRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'seekTo', args: [time/1000, true] }),
          '*'
      );
    }
  };

  const returnFilteredPoints = () => {
    let filteredPoints = matchData.points;
    const filterMap = new Map();
  
    // Group filters by key
    filterList.forEach(filter => {
      const [key, value] = filter;
      if (filterMap.has(key)) {
        filterMap.get(key).push(value);
      } else {
        filterMap.set(key, [value]);
      }
    });
  
    // Apply filters
    filterMap.forEach((values, key) => {
      if (values.length > 1) {
        // Multiple values for the same key, use OR logic
        filteredPoints = filteredPoints.filter(point => values.includes(point[key]));
      } else {
        // Single value for the key, use AND logic
        filteredPoints = filteredPoints.filter(point => point[key] === values[0]);
      }
    });
  
    return filteredPoints;
  }

  // // This filter logic gets rid of anything that doesn't match all of the filters
  // const returnFilteredPoints = () => { // filter is an array of [key, value]
  //   let filteredPoints = matchData.points;
  //   filterList.forEach(filter => {
  //     filteredPoints = filteredPoints.filter(point => point[filter[0]] === filter[1]);
  //   });
  //   return filteredPoints;
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title className='title'>Match Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!matchData && (
          <>
            <h1 className={styles.title}>
            Match Viewer
            </h1>

            <p className={styles.description}>
              Get started by <Link href="/upload-video">uploading a video</Link>.
            </p>

            {/* Search Dropdown */}
            <div className="searchDropdown">
              <SearchDropdown setMatchData={setMatchData} />
            </div>
          </>
        )}

        {/* Main Content Area */}
        {matchData && (
          <>
            {/* Toolbar */}
            <Toolbar setMatchData={setMatchData}/>
            <h2>{matchData.name}</h2>
            <div className={styles.mainContent}>
              {/* Video Player */}
              <div className="videoPlayer">
                <VideoPlayer videoURL={matchData ? matchData.url : ''} videoRef={videoRef} />
              </div>
              <div className="list">

              {/* Filter List */}
              <div className="filterList">
                <FilterList pointsData={matchData.points} filterList={filterList} setFilterList={setFilterList} />
              </div>

              {/* Points List */}
              <div className="pointsList">
              <PointsList pointsData={returnFilteredPoints()} onPointSelect={handleJumpToTime}/>
              </div>
              </div>
            </div>
          </>
        )}

      </main>

      <footer>
      Developed by Bruin Sports Analytics for use by UCLA Tennis
      </footer>


      <style jsx>{`
        main {
          width:80vw;
          padding-top: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin:10px 0px;
          
          
        }
        .title{
          color:#003B5C;
        }
        .searchDropdown {
          margin-bottom: 1rem;
          min-width: 400px;
        }

        ${styles.mainContent} {
          display: flex;
          flex-direction: row;
         // width: 80vw; // Take up the full width
          justify-content: space-between;
          align-items: center;
          flex-wrap:wrap;
          gap:10vw;
        }
        .list{
          display:flex;
          flex-direction:row;
          width:27vw;
          gap:2vw;
          justify-content:flex-end;
        }
        .videoPlayer {
          flex-grow: 2; // Takes up 2/3 of the space
          padding: 1rem;
          width:53vw;
          outline:none;
          border:none;
        }

        .pointsList,.filterList {
          flex-grow: 1; // Takes up 1/3 of the space
          margin-top: 1rem;
          padding:10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow-y: auto;
          height: 400px;
          // width:18%;
          //gap:20px;
        }

        

        footer {
          background:#FFC72C;
          width: 100%;
          font-weight:500;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        // @media screen and (max-width:760px)
        // {
        //   .videoPlayer{
        //     width:80vw;
        //     overflow-y:auto;
        //   }
        //   ${styles.mainContent},main{
        //     flex-direction:column;
        //   }
        // }
      `}</style>


      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
