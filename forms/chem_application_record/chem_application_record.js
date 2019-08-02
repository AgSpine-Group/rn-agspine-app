const chemFormData = {
  location: {
    id: '',
    locationName: '',
  },
  date: '',
  applicatorName: '',
  area: {
    identification: {
      areaName: '',
      id: '',
    },
    treatmentArea: '',
    growthStage: '',
    cropSituation: '',
    comment: '',
  },
  pestDetails: {
    pestType: '',
    growthStage: '',
    density: '',
    comment: '',
  },
  chemicalDetails: {
    product: '',
    actionGroup: '',
    batchNo: '',
    rate: '',
    whp: '',
    whpEndDate: '',
  },
  weather: {
    startTime: '',
    startTemp: '',
    startRelHumidity: '',
    startWindSpeed: '',
    startDirection: '',
    startVariability: '',
    endTime: '',
    endTemp: '',
    endRelHumidity: '',
    endWindSpeed: '',
    endDirection: '',
    endVariability: '',
  },
  applicationDetails: {
    nozzleBrand: '',
    nozzleType: '',
    sprayQuality: '',
    angle: '',
    size: '',
    pressure: '',
    waterRate: '',
    quantityApplied: '',
    waterSource: '',
  },
  generalComment: '',
};

export default chemFormData;
