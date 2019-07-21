const uuid = require('uuid-v4');

const propertyData = () =>
  Array(2)
    .fill(1)
    .map((x, p) => ({
      propertyName: `Test ${p + 1} property`,
      propertyId: uuid(),
    }));

const generateLocation = properties =>
  Array(12)
    .fill(1)
    .map((x, p) => ({
      locationId: uuid(),
      locationName: `Test ${p + 1} location`,
      propertyData: p % 2 === 0 ? properties[0] : properties[1],
    }));

const generateTestProfile = () => {
  const properties = propertyData();
  const locationData = generateLocation(properties);
  return {
    profile: {
      organisationId: uuid(),
      properties,
      locations: locationData,
    },
    properties,
    locations: locationData,
  };
};

export default generateTestProfile;
