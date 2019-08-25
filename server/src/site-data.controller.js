/* Controller for Site data. 
If you wanted to change how data 
is stored this is the file to modify.

For now we are storing the state in memory.
*/

class SiteDataController {

  constructor() {
    this.isSetup = false;

    this.manifest = {};
    this.siteData = {};
  }


  setManifest(newManifest) {
    this.siteData = {};
    this.manifest = newManifest;
  }

  getManifest() {
    return this.manifest;
  }

  setSiteData(site, type, data) {
    if (!this.siteData[site]) { 
      this.siteData[site] = {}
    }
    this.siteData[site][type] = data;
  }

  getSiteDataBySite(site, type) {
    if (this.siteData[site] && this.siteData[site][type])
      return this.siteData[site][type];
    else
      return {};
  }

  getSiteDataStatus() {
    return this.siteData.keys();
  }

}
const singleton = new SiteDataController();
module.exports = singleton;