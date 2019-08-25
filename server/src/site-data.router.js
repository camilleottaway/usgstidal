const express = require('express');
const SiteData = require('./site-data.controller');
const Auth = require('./auth');

const SiteDataRouter = express.Router()

SiteDataRouter.get('/manifest',(req, res) =>{    
    res.send(SiteData.getManifest());
});

SiteDataRouter.post('/manifest', (req, res) => {  
  const key = req.get('Authorization');
  try {
    Auth(key);
    try{
      SiteData.setManifest(req.body);
      res.send();
    }catch(err){
      res.statusMessage = "Error when setting site data";
      res.status(500).end();
    }    
  }catch(err){
    res.statusMessage = "Authorization key is not corrent";
    res.status(400).end();
  }  
});


SiteDataRouter.get('/getsite/:id/:type', (req, res) => {
  res.send(SiteData.getSiteDataBySite(req.params.id, req.params.type));
});


SiteDataRouter.post('/site/:id/:type', (req, res) => {
  const key = req.get('Authorization');
  try {
    Auth(key);
    try{
      SiteData.setSiteData(req.params.id, req.params.type, req.body);
      res.send();
    }catch(err){
      res.statusMessage = "Error when setting site data";
      res.status(500).end();
    }
  }catch(err){
    res.statusMessage = "Authorization key is not corrent";
    res.status(400).end();
  }  
});


module.exports = SiteDataRouter;