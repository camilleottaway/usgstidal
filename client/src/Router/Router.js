import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { MapView, AboutView } from '../Views';
import {WaterNTRGraph} from '../Graph/WaterNTRGraph';
import {WaterTWLGraph} from '../Graph/WaterTWLGraph';
import {WindSpeedGraph} from '../Graph/WindSpeedGraph';
import {WindDirGraph} from '../Graph/WindDirGraph';
import { Navigation } from './Navigation';

export const AppRouter = () => (
  <Router>
    <div>
      <Navigation />
      <Route path="/" exact component={MapView} />
      <Route path="/about" exact component={AboutView} />
      <Route path="/WaterNTRGraph" exact component={WaterNTRGraph} />
      <Route path="/WaterTWLGraph" exact component={WaterTWLGraph} />
      <Route path="/WindSpeedGraph" exact component={WindSpeedGraph} />
      <Route path="/WindDirGraph" exact component={WindDirGraph} />
    </div>
  </Router>
);
