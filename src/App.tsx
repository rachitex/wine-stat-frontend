import React from 'react';
import WineStatistics from './WineStatistics';
const wineData = require('./Wine-Data.json');

/**
 * The root component of the application.
 */
const App: React.FC = () => {
  return (
    <div>
      {/* Render the WineStatistics component and pass the wineData as prop */}
      <WineStatistics data={wineData} />
    </div>
  );
};

export default App;
