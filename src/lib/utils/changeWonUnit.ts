const changeWonUnit = (won: number) => {
  if (won < 1000000) {
    return `${won / 1000}천원`;
  } else {
    return `${won / 10000}만 ${won / 1000}천원`;
  }
};

export default changeWonUnit;
