let normalizeString  = (string) => {
  if(string){
    return string.trim().toLowerCase();
  }
  return null;
}

let initialCapsString = (string) => {
  if(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
}

let beautifyString = (string) => {
  return string.replace(/_|-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

let formatTimestampToDate = (timestamp) => {
  if(!timestamp)
  {
    return timestamp;
  }
  return new Date(timestamp).toLocaleDateString();
}

let getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export {normalizeString, initialCapsString, beautifyString, formatTimestampToDate, getRandomColor};
