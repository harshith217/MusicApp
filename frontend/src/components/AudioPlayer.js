// src/components/AudioPlayer.js
import React from 'react';

const AudioPlayer = ({ trackName, previewUrl }) => {
  // Check if previewUrl is available
  if (!previewUrl) {
    return <p className="text-red-500">No preview available for {trackName}</p>;
  }

  return (
    <div>
      <audio controls>
        <source src={previewUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
