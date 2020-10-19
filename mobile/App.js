import React, { Fragment } from 'react';
import { LogBox, StatusBar } from 'react-native';

import Routes from './src/routes';
export default function App() {
  return (
    <Fragment>
      <StatusBar style="auto" />
      <Routes />
    </Fragment>
  );
}

LogBox.ignoreAllLogs(true);
