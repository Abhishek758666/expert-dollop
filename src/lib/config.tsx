// const API_BASE_URL = "http://localhost:4000/api/v1";
// const API_BASE_URL_IMAGE = `http://localhost:4000/uploads`;
const API_BASE_URL = "https://portfolio-backend-ftfj.onrender.com/api/v1";
const API_BASE_URL_IMAGE = `https://portfolio-backend-ftfj.onrender.com/uploads`;

const PERSIST_VERSION = 1;
const PERSIST_KEY = "abhishek-portfolio";
const API_EXPIRE_TIME = 5000;
const FFEATURE_FLAGS = {
  newFeature: true,
  experimentalFeature: true,
};
export {
  API_BASE_URL,
  PERSIST_KEY,
  PERSIST_VERSION,
  FFEATURE_FLAGS,
  API_EXPIRE_TIME,
  API_BASE_URL_IMAGE,
};
