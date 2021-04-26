const planets = require('./planets');

const degreesOfCircumference = 360;

/**
 * Calculate the new angle of the planet.
 *
 * @param {number} days - Days elapsed for the study
 * @param {number} speed - Rotational speed in degrees
 * @param {string} rotationType - Planet rotation type
 * @returns {number} Planet Angle
 */
const calculateAngle = (days, speed, rotationType) => {
  let angle = (speed * days) % degreesOfCircumference;
  if (rotationType === 'COUNTERCLOCKWISE') {
    angle = degreesOfCircumference - angle;
  }

  return angle;
};

/**
 * Converts a polar coordinate to Cartesian from a radius and an angle.
 *
 * @param {number} radius - Distance between the sun and the planet
 * @param {number} angle - Planet Angle
 * @returns {Object} X and Y cartesian coordinates
 */
const polarToCartesianCoordinates = (radius, angle) => {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return { x, y };
};

/**
 * This function calculates the direction that exists from planet A to planet B.
 *
 * @param {Object} pointA - The x and y cartesian coordinates of planet A
 * @param {Object} pointB - The x and y cartesian coordinates of planet B
 * @returns {Object} Planets vector
 */
const getVector = (pointA, pointB) => {
  const { x: xa, y: ya } = pointA;
  const { x: xb, y: yb } = pointB;
  const x = xb - xa;
  const y = yb - ya;

  return { x, y };
};

/**
 * Validates if two vector are lineals by calculating if the coordinates are proportional.
 *
 * @param {*} vectorA - The Vector A
 * @param {*} vectorB - The Vector B
 * @returns {boolean} Validation result
 */
const areLineal = (vectorA, vectorB) => {
  const { x: xa, y: ya } = vectorA;
  const { x: xb, y: yb } = vectorB;
  const propotionalX = xa / xb;
  const propotionalY = ya / yb;

  return propotionalX === propotionalY;
};

// Usar vectores AB y AC
/**
 * Validates if point inside the triangle.
 *
 * @param {Object} vectorA - Vector from vertex to point B
 * @param {Object} vectorB - Vector from vertex to point C
 * @param {Object} vertex - Point A
 * @param {Object} point - Point to validate
 * @returns {boolean} Validation result
 */
const pointInTriangle = (vectorA, vectorB, vertex, point) => {
  const { x: dx, y: dy } = vectorA;
  const { x: ex, y: ey } = vectorB;
  const { x: vx, y: vy } = vertex;
  const { x: px, y: py } = point;

  const w1 = (ex * (vy - py) + ey * (px - vx)) / (dx * ey - dy * ex);
  const w2 = ey ? (py - vy - w1 * dy) / ey : 0;

  return (w1 >= 0) && (w2 >= 0) && ((w1 + w2) <= 1);
};

const calculatePlanetPosition = (days) => {
  const planetsWithCoordinates = planets.map((planet) => {
    const angle = calculateAngle(days, planet.speed, planet.rotation);
    const coordinates = polarToCartesianCoordinates(planet.distance, angle);

    return {
      ...planet,
      ...coordinates,
    };
  });

  return planetsWithCoordinates;
};

const getWeather = (day) => {
  // Calculate Planets positions
  // Calculate if planets are align
  // If planets not align Calculate if sun is inside the trigangle
  // If sun inside the triangle save the perimeter
};
