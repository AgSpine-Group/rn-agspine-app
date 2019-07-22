const uuid = require('uuid-v4');
const firebase = require('firebase');

const locationData = () =>
  Array(2)
    .fill(1)
    .map((x, p) => ({
      locationName: `Test ${p + 1} property`,
      id: uuid(),
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: null,
    }));

const generateAreas = (locations, organisationId) =>
  Array(12)
    .fill(1)
    .map((x, p) => ({
      id: uuid(),
      areaName: `Test ${p + 1} location`,
      location: p % 2 === 0 ? locations[0] : locations[1],
      organisationId,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: null,
      lastAppliedDate: null,
    }));

const assignLocations = (locations, areaData, organisationId) =>
  locations.map(x => ({
    ...x,
    organisationId,
    areas: areaData.filter(a => a.location.id === x.id),
  }));

const generateTestProfile = () => {
  const organisationId = uuid();
  const locations = locationData();
  const areaData = generateAreas(locations, organisationId);
  const locationWithAreas = assignLocations(locations, areaData, organisationId);
  const createData = {
    profile: {
      organisationId,
      locations: locationWithAreas,
      areas: areaData,
    },
    locations: locationWithAreas,
    areas: areaData,
  };
  return createData;
};

export default generateTestProfile;
