export interface WineData {
    "Alcohol": number;
    "Malic Acid": number | string;
    "Ash": number;
    "Alcalinity of ash": number | string;
    "Magnesium": number;
    "Total phenols": number | string;
    "Flavanoids": number;
    "Nonflavanoid phenols": number | string;
    "Proanthocyanins": number | string;
    "Color intensity": number;
    "Hue": number;
    "OD280/OD315 of diluted wines": number | string;
    "Unknown": number | string;
  }
  
  /**
   * Calculates the flavanoids statistics for each alcohol class.
   * @param data The wine data array.
   * @returns Object containing the mean, median, and mode of flavanoids for each alcohol class.
   */
  export const calculateFlavanoidsStatistics = (data: WineData[]): {
    mean: number[];
    median: number[];
    mode: number[];
  } => {
    const classFlavanoids: { [key: string]: number[] } = {};
  
    for (const wine of data) {
      const alcoholClass = wine.Alcohol.toString();
      const flavanoids = wine.Flavanoids;
  
      if (!isNaN(flavanoids)) {
        if (!classFlavanoids[alcoholClass]) {
          classFlavanoids[alcoholClass] = [];
        }
        classFlavanoids[alcoholClass].push(flavanoids);
      }
    }
  
    const classes = Object.keys(classFlavanoids).sort();
    const mean: number[] = [];
    const median: number[] = [];
    const mode: number[] = [];
  
    for (const alcoholClass of classes) {
      const flavanoidsData = classFlavanoids[alcoholClass];
      const sortedFlavanoids = [...flavanoidsData].sort((a, b) => a - b);
  
      // Calculate mean
      const sum = sortedFlavanoids.reduce((acc, val) => acc + val, 0);
      const classMean = sum / sortedFlavanoids.length;
      mean.push(classMean);
  
      // Calculate median
      const middleIndex = Math.floor(sortedFlavanoids.length / 2);
      const classMedian =
        sortedFlavanoids.length % 2 === 0
          ? (sortedFlavanoids[middleIndex] + sortedFlavanoids[middleIndex - 1]) / 2
          : sortedFlavanoids[middleIndex];
      median.push(classMedian);
  
      // Calculate mode
      const counts: { [key: number]: number } = {};
      let maxCount = 0;
      let classMode = 0;
  
      for (const val of sortedFlavanoids) {
        counts[val] = (counts[val] || 0) + 1;
        if (counts[val] > maxCount) {
          maxCount = counts[val];
          classMode = val;
        }
      }
  
      mode.push(classMode);
    }
  
    return { mean, median, mode };
  };
  
  /**
   * Calculates the gamma statistics for each alcohol class.
   * @param data The wine data array.
   * @returns Object containing the mean, median, and mode of gamma for each alcohol class.
   */
  export const calculateGammaStatistics = (data: WineData[]): {
    mean: number[];
    median: number[];
    mode: number[];
  } => {
    const classGamma: { [key: string]: number[] } = {};
  
    for (const wine of data) {
      const alcoholClass = wine.Alcohol.toString();
      const ash = wine.Ash;
      const hue = wine.Hue;
      const magnesium = wine.Magnesium;
      const gamma = !isNaN(ash) && !isNaN(hue) && !isNaN(magnesium) ? (ash * hue) / magnesium : 0;
  
      if (!classGamma[alcoholClass]) {
        classGamma[alcoholClass] = [];
      }
      classGamma[alcoholClass].push(gamma);
    }
  
    const classes = Object.keys(classGamma).sort();
    const mean: number[] = [];
    const median: number[] = [];
    const mode: number[] = [];
  
    for (const alcoholClass of classes) {
      const gammaData = classGamma[alcoholClass];
      const sortedGamma = [...gammaData].sort((a, b) => a - b);
  
      // Calculate mean
      const sum = sortedGamma.reduce((acc, val) => acc + val, 0);
      const classMean = sum / sortedGamma.length;
      mean.push(classMean);
  
      // Calculate median
      const middleIndex = Math.floor(sortedGamma.length / 2);
      const classMedian =
        sortedGamma.length % 2 === 0
          ? (sortedGamma[middleIndex] + sortedGamma[middleIndex - 1]) / 2
          : sortedGamma[middleIndex];
      median.push(classMedian);
  
      // Calculate mode
      const counts: { [key: number]: number } = {};
      let maxCount = 0;
      let classMode = 0;
  
      for (const val of sortedGamma) {
        counts[val] = (counts[val] || 0) + 1;
        if (counts[val] > maxCount) {
          maxCount = counts[val];
          classMode = val;
        }
      }
  
      mode.push(classMode);
    }
  
    return { mean, median, mode };
  };
  