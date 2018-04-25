import sentiment from 'sentiment';

let sentimentAnalyzer = {};

sentimentAnalyzer.analyzeText = (text) => {
  return sentiment(text);
};

sentimentAnalyzer.analyzeArray = (array) => {
  return new Promise ((resolve, reject) => {
    let sentiments = array.map((currentValue) => {
      return resolve(sentimentAnalyzer.analyzeText(text));
    });
    return resolve(sentiments);
  });
};

export default sentimentAnalyzer;
