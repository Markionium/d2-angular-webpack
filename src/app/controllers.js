export function listOfDataSetsController($scope, d2) {
    this.listOfDataSets = [];

    d2.models.dataSets
        .list()
        .then((dataSets) => {
            // Callback needs to be wrapped in apply because of how angular works with outside libraries
            // You could abstract this away or write some code that does an apply on each list() / get()
            $scope.$apply(() => this.listOfDataSets = dataSets.toArray());
        });
}