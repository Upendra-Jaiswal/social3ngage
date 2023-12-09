import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [data, setData] = useState("");

  let modifiedTimestamp = 0;

  let currenttime = 0;
  let minus6hous = 0;
  let timestampPost = 0;

  const getPostId = () => {
    const regex = /([0-9]{19})/;
    const postId = regex.exec(url)?.[1];
    return postId;
  };

  const extractUnixTimestamp = (postId) => {
    const asBinary = BigInt(postId).toString(2);
    const first41Chars = asBinary.slice(0, 41);
    const timestamp = parseInt(first41Chars, 2);
    return timestamp;
  };

  const unixTimestampToHumanDate = (timestamp) => {
    const dateObject = new Date(timestamp);

    const humanDateFormat = dateObject.toUTCString() + " (UTC)";
    return humanDateFormat;
  };

  function getDate(linkedinURL) {
    const postId = getPostId(linkedinURL);
    const unixTimestamp = extractUnixTimestamp(postId);

    const modifiedTimestamp = unixTimestamp - 30 * 60 * 1000;

    const humanDateFormat = unixTimestampToHumanDate(modifiedTimestamp);

    const modifiedEpochTime = Math.floor(modifiedTimestamp / 1000);

    setData(modifiedEpochTime);

    return humanDateFormat;
  }

  const isPostValid = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Adjust the time by 6 hours
    currentDate.setHours(currentDate.getHours() - 6);

    // Get the epoch time (Unix timestamp) in milliseconds
    const epochTime = currentDate.getTime();

    if (timestamp <= epochTime) {
      return false;
    } else {
      return true;
    }
  };

  // const disableSubmit = () ={
  //   if(!isPostValid){

  //   }
  // }

  const submitPost = () => {
    console.log("post submitted");
  };

  const checkLink = () => {};
  const startChallenge = () => {};
  return (
    <div>
      <label htmlFor="url">LinkedIn URL:</label>
      <input
        type="text"
        id="url"
        placeholder="Enter LinkedIn URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      {/* <button onClick={handleExtractTimestamp}>Extract Timestamp</button> */}
      <p>{timestamp}</p>
      <div>social 3ngage</div>
      <p>{data} epoch munis time</p>
      <button onClick={startChallenge}>Start challenge</button>
      <br />
      <input type="textbox" />
      input
      <br />
      <button onClick={checkLink}>check link</button>
      <button onClick={getDate}>check timestamp</button>
      {/* <button {!isPostValid  onClick={submitPost} : disabled >Submit</button> */}
      {/* 
<button onClick={isPostValid ? submitPost : null} disabled={!isPostValid}>
Submit
</button> */}
      {/* <button disabled={isPostValid}>Submit</button> */}
      <button
        onClick={!isPostValid ? submitPost : null}
        disabled={!isPostValid ? true : false}
      >
        Submit
      </button>
    </div>
  );
}

//   const startChallenge = () => {

//   };

//   const checkLink = () => {};

//   return (
//     <>
//       <div>social 3ngage</div>
//       <button onClick={startChallenge}>Start challenge</button>
//       <br />
//       <input type="textbox" />
//       input
//       <br />
//       <button onclick={checkLink}>check link</button>
//     </>
//   );
// }

export default App;
