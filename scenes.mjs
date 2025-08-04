const eventAnnotations = [
  {
    year: 1988,
    month: 6,
    text: "IPCC Established: Global scientific consensus begins",
    x: -100,
    y: -20,
  },
  {
    year: 1997,
    month: 12,
    text: "Kyoto Protocol Signed: First major international climate treaty",
    x: -50,
    y: -20,
  },
  {
    year: 2015,
    month: 12,
    text: "Paris Climate Accords: Landmark global agreement",
    x: -150,
    y: 0,
  },
  {
    year: 2020,
    month: 4,
    text: "COVID-19 Pandemic: Temporary drop in emissions",
    x: -50,
    y: 0,
  },
];

export const scenes = [
  {
    title: "Scene 1: CO2 Growth",
    getData: (co2DataGlobal, getTempSlice, currentIndex) => ({
      co2: co2DataGlobal.slice(0, currentIndex),
      temp: [],
      description:
        "CO2 levels have been steadily rising since the start of the industrial era. As we look at the data, we can see that the total CO2 concentration has increased significantly over the past few decades. The data provided by NASA only goes back as far as 1958, but the data shows a clear upward trend. Every year, the average CO2 concentration increases at an exponential rate, with every year setting a new record high.",
      annotations: [],
      controls: { play: true },
    }),
  },
  {
    title: "Scene 2: Annual CO2 Cycles",
    getData: (co2DataGlobal, getTempSlice, currentIndex) => {
      const yearToShow = 2001;
      const yearData = co2DataGlobal.filter(
        (d) => d.date.getFullYear() === yearToShow
      );
      return {
        co2: yearData,
        temp: [],
        description: `Zooming into a random year like ${yearToShow}, we see the annual cycle: CO2 drops in spring/summer as plants absorb CO2, then rises in fall/winter as plants die and release CO2. This is a natural cycle that has been occuring for millions of years.`,
        annotations: [
          {
            year: yearToShow,
            month: 5,
            text: "Seasonal CO2 maximum",
            x: 50,
            y: 0,
            align: "left",
          },
          {
            year: yearToShow,
            month: 9,
            text: "Seasonal CO2 minimum",
            x: -20,
            y: -20,
          },
        ],
        controls: {},
      };
    },
  },
  {
    title: "Scene 3: Temperature Trends",
    getData: (co2DataGlobal, getTempSlice, currentIndex) => ({
      co2: co2DataGlobal,
      temp: getTempSlice(co2DataGlobal.length),
      description:
        "Global temperatures have risen alongside CO2 levels. NASA’s temperature records show that the past decade has included some of the hottest years ever recorded. The data underscores the urgent need to address the global CO2 emissions crisis and its impact on us all.",
      annotations: [],
      controls: {},
    }),
  },
  {
    title: "Scene 4: Key Climate Events",
    getData: (co2DataGlobal, getTempSlice, currentIndex) => ({
      co2: co2DataGlobal,
      temp: getTempSlice(co2DataGlobal.length),
      description:
        "Key climate measures have attempted to shape the global response to the changes in global climate. The establishment of the Intergovernmental Panel on Climate Change (IPCC) in 1988 marked a significant step in global climate science. The Kyoto Protocol in 1997 was the first major international treaty to reduce greenhouse gas emissions. The Paris Climate Accords in 2015 represented a landmark global agreement to limit global warming. Although we have made some agreements between countries, the data shows that these efforts have been more symbolic than effective.",
      annotations: eventAnnotations,
      controls: {},
    }),
  },
  {
    title: "Scene 5: Explore the Data",
    getData: (co2DataGlobal, getTempSlice, currentIndex) => ({
      co2: co2DataGlobal.slice(0, currentIndex),
      temp: getTempSlice(currentIndex),
      description:
        "In this scene, I encourage viewers to explore the data themselves. By interacting with the visualization, they can gain insights into the trends and patterns present in the CO2 and temperature data.",
      annotations: eventAnnotations,
      controls: { play: true, yearSlider: true },
    }),
  },
];
