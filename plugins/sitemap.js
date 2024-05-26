const path = require('path');
const { getSitemapData, generateSitemap, generateRobotsTxt } = require('./util');

const WebpackPluginCompiler = require('./plugin-compiler');

module.exports = function sitemap(nextConfig = {}) {
  const { env, outputDirectory, outputName, verbose = false } = nextConfig;

  const plugin = {
    name: 'Sitemap',
    outputDirectory: outputDirectory || './public',
    outputName: outputName || 'sitemap.xml',
    getData: getSitemapData,
    generate: generateSitemap,
    postcreate: generateRobotsTxt,
  };

  const { WORDPRESS_GRAPHQL_ENDPOINT } = env;

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
    if (!config.watchOptions) {
      config.watchOptions = {};
    }

    // Handle different types of config.watchOptions.ignored
    if (Array.isArray(config.watchOptions.ignored)) {
      // It's already an array, so we can safely push to it
      config.watchOptions.ignored.push(path.join('**', plugin.outputDirectory, plugin.outputName));
    } else if (typeof config.watchOptions.ignored === 'string') {
      // Convert the string to an array and add the new path
      config.watchOptions.ignored = [config.watchOptions.ignored, path.join('**', plugin.outputDirectory, plugin.outputName)];
    } else if (typeof config.watchOptions.ignored === 'function') {
      // If it's a function, wrap it in an array with the new path
      const originalIgnored = config.watchOptions.ignored;
      config.watchOptions.ignored = [
        originalIgnored,
        path.join('**', plugin.outputDirectory, plugin.outputName)
      ];
    } else {
      // Otherwise, initialize it as an array
      config.watchOptions.ignored = [path.join('**', plugin.outputDirectory, plugin.outputName)];
    }

      config.plugins.push(
        new WebpackPluginCompiler({
          url: WORDPRESS_GRAPHQL_ENDPOINT,
          plugin,
          verbose,
        })
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
