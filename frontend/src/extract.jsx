import React, { useState } from 'react';

const TimestampExtractor = () => {
  const [url, setUrl] = useState('');
  const [timestamp, setTimestamp] = useState('');

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
    const humanDateFormat = dateObject.toUTCString() + ' (UTC)';
    return humanDateFormat;
  };

  const handleExtractTimestamp = () => {
    const postId = getPostId();
    if (postId) {
      const unixTimestamp = extractUnixTimestamp(postId);
      const humanDateFormat = unixTimestampToHumanDate(unixTimestamp);
      setTimestamp(humanDateFormat);
    } else {
      setTimestamp('Invalid LinkedIn URL');
    }
  };

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
      <button onClick={handleExtractTimestamp}>Extract Timestamp</button>
      <p>{timestamp}</p>
    </div>
  );
};

export default TimestampExtractor;
