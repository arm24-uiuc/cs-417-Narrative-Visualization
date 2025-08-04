export async function loadData(co2Path, tempPath, startYears) {
  const [co2Data, tempData] = await Promise.all([
    d3.csv(co2Path),
    d3.csv(tempPath),
  ]);

  co2Data.forEach((d) => {
    d.date = new Date(+d.year, +d.month - 1);
    d.average = +d.average;
  });

  const filteredCo2Data = co2Data.filter((d) => d.date.getFullYear() >= 1959);
  tempData.forEach((d) => {
    d.date = new Date(+d.year, 0);
    d.temp = +d["lowess(5)"];
  });

  const firstYear = filteredCo2Data[0].date.getFullYear();
  const cutoffYear = firstYear + startYears;
  const currentIndex = filteredCo2Data.findIndex(
    (d) => d.date.getFullYear() >= cutoffYear
  );

  function getTempSlice(idx) {
    const startDate = filteredCo2Data[0]?.date;
    const endDate = filteredCo2Data[idx - 1]?.date;
    return tempData.filter((d) => d.date >= startDate && d.date <= endDate);
  }

  return { co2Data: filteredCo2Data, tempData, currentIndex, getTempSlice };
}
