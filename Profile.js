const uuid = require('uuid-v4');

const generateLocation = () =>
  Array(12)
    .fill(1)
    .map((x, p) => ({
      locationId: uuid(),
      locationName: `Test ${p + 1} location`,
    }));

const generateTestProfile = () => ({
  organisationId: uuid(),
  locationData: generateLocation(),
});

export default generateTestProfile;
