import { listOfDataSetsController } from './controllers';

// Depends on the d2 module from the init.js
export default angular.module('d2-example', ['d2'])
    .controller('listOfDataSetsController', listOfDataSetsController);
