module.exports = (app) => {
  require("./api/routes/manufacturer.routes.js")(app);
  require("./api/routes/yeast.routes.js")(app);
  require("./api/routes/grains/grain.routes.js")(app);
  require("./api/routes/hops.routes.js")(app);
  require("./api/routes/grains/adjunct.routes.js")(app);
};
