const { DateTime } = require("luxon");
const path = require('path');

const helpers = {
  currentYear() {
    return new Date().getFullYear();
  }
};

module.exports = function(eleventyConfig) {
  // Add flexible date filter
  eleventyConfig.addNunjucksFilter("date", function(date, format) {
    return DateTime.fromJSDate(date).toFormat(format);
  });

  // Keep existing filters for backward compatibility
  eleventyConfig.addNunjucksFilter("dateIso", function(date) {
    return DateTime.fromJSDate(date).toISO();
  });

  eleventyConfig.addNunjucksFilter("dateReadable", function(date) {
    return DateTime.fromJSDate(date).toFormat("dd LLL yyyy");
  });

  // Pass through static files
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});

  // Explicitly copy CSS file
  eleventyConfig.addPassthroughCopy("src/assets/styles.css");

  // Add collection for blog posts
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md");
  });

  // Copy favicon to output
  eleventyConfig.addPassthroughCopy({"src/favicon.ico": "favicon.ico"});

  // Copy images to output
  eleventyConfig.addPassthroughCopy("src/assets/images");

  // Add Nunjucks global for helpers
  eleventyConfig.addNunjucksGlobal('helpers', helpers);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
