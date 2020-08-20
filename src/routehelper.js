module.exports = (app) => {
  require("./api/routes/manufacturer.routes.js")(app);
  require("./api/routes/yeast.routes.js")(app);
  require("./api/routes/grain.routes.js")(app);
  require("./api/routes/hops.routes.js")(app);
};
