const changeWonUnit = (won: number) => {
  if (won < 1000000) {
    return `${won / 1000}천원`;
  } else {
    const thousandNumber = String(Math.floor(won / 1000)).slice(-1);
    return `${Math.floor(won / 10000).toLocaleString()}만${
      thousandNumber !== "0" ? thousandNumber + "천원" : "원"
    }`;
  }
};

export default changeWonUnit;
