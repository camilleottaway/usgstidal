const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");

const { staticFilesSetup } = require("./static-files");
const SiteDataRouter = require("./site-data.router");
const env = require("./env.json");

const app = express();
const port = 8080;

const ADMINKEY = process.env.usgstidalapiadminkey || env.usgstidalapiadminkey;
console.log(ADMINKEY);
if (!ADMINKEY || ADMINKEY === "") {
  console.log(
    'error: environment variable of: "usgstidalapiadminkey" is not setup. Please add this to your bash envrioment'
  );
  process.exit(1);
}

//config
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ limit: "505mb", extended: true }));
app.use(bodyParser.json({ limit: "505mb", extended: true }));

//Site data
//setupManifestDataRoutes(app);
app.use(SiteDataRouter);

//Serve website
// This needs to be the last item as it has a catch all rules
staticFilesSetup(app);

//Start Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
