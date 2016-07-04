// When the app is built for development, DHIS_CONFIG is replaced with the config read from $DHIS2_HOME/config.js[on]
// When the app is built for production, process.env.NODE_ENV is replaced with the string 'production', and
// DHIS_CONFIG is replaced with an empty object
const dhisDevConfig = DHIS_CONFIG; // eslint-disable-line

// This code will only be included in non-production builds of the app
// It sets up the Authorization header to be used during CORS requests
// This way we can develop using webpack without having to install the application into DHIS2.
if (process.env.NODE_ENV !== 'production') {
    jQuery.ajaxSetup({ headers: { Authorization: dhisDevConfig.authorization } }); // eslint-disable-line
}

import angular from 'angular';
import { init, config, getManifest } from 'd2/lib/d2';

import App from './app/app';
import './app/app.scss';

function startApp(d2) {
    // Create an angular module that provides and initialized d2 to the application
    // This module is specified as a dependency of the app in app/app.js
    angular.module('d2', []).factory('d2', () => d2);

    // Bootstrap the app with the d2 module
    angular.bootstrap(document.querySelector('body'), ['d2-example']);
}


// Load the application manifest to be able to determine the location of the Api
// After we have the location of the api, we can set it onto the d2.config object
// and initialise the library. We use the initialised library to pass it into the app.
getManifest('./manifest.webapp')
    .then(manifest => {
        const baseUrl = process.env.NODE_ENV === 'production' ? manifest.getBaseUrl() : dhisDevConfig.baseUrl;
        config.baseUrl = `${baseUrl}/api`;
    })
    .then(init)
    .then(startApp)
    .catch(console.error.bind(console));
