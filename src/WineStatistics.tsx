import React, { useEffect, useState } from 'react';
import { WineData, calculateFlavanoidsStatistics, calculateGammaStatistics } from './utils';

interface WineStatisticsProps {
  data: WineData[];
}

const WineStatistics: React.FC<WineStatisticsProps> = ({ data }) => {
  // State variables to store the calculated statistics
  const [flavanoidsStats, setFlavanoidsStats] = useState<{
    mean: number[];
    median: number[];
    mode: number[];
  }>({ mean: [], median: [], mode: [] });

  const [gammaStats, setGammaStats] = useState<{
    mean: number[];
    median: number[];
    mode: number[];
  }>({ mean: [], median: [], mode: [] });

  // Calculate the statistics when the data prop changes
  useEffect(() => {
    // Calculate flavanoids statistics
    const flavanoidsStats = calculateFlavanoidsStatistics(data);
    setFlavanoidsStats(flavanoidsStats);

    // Calculate gamma statistics
    const gammaStats = calculateGammaStatistics(data);
    setGammaStats(gammaStats);
  }, [data]);

  // Render the table with the statistics
  return (
    <table cellPadding="5" cellSpacing="1">
      <tr>
        <td>Measure</td>
        {/* Render the column headers for each class */}
        {Object.keys(flavanoidsStats.mean).map((index) => (
          <td key={index}>Class {parseInt(index, 10) + 1}</td>
        ))}
      </tr>
      <tr>
        <td>Flavanoids Mean</td>
        {/* Render the mean values for flavanoids */}
        {flavanoidsStats.mean.map((value, index) => (
          <td key={index}>{value.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td>Flavanoids Median</td>
        {/* Render the median values for flavanoids */}
        {flavanoidsStats.median.map((value, index) => (
          <td key={index}>{value.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td>Flavanoids Mode</td>
        {/* Render the mode values for flavanoids */}
        {flavanoidsStats.mode.map((value, index) => (
          <td key={index}>{value.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td>Gamma Mean</td>
        {/* Render the mean values for gamma */}
        {gammaStats.mean.map((value, index) => (
          <td key={index}>{value.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td>Gamma Median</td>
        {/* Render the median values for gamma */}
        {gammaStats.median.map((value, index) => (
          <td key={index}>{value.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td>Gamma Mode</td>
        {/* Render the mode values for gamma */}
        {gammaStats.mode.map((value, index) => (
          <td key={index}>{value.toFixed(3)}</td>
        ))}
      </tr>
    </table>
  );
};

export default WineStatistics;
