const { override } = require('customize-cra');

const addPublicPath = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.output.publicPath = './';
  }
  return config;
};

module.exports = override(addPublicPath());
