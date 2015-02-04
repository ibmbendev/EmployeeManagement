/**
 * Created by fission on 8/14/2014.
 */

myApp.factory("getDataFactory", ["$http", "$q", "$log", function ($http, $q, $log) {

    var factoryObject = {};

    var promise = getObjectFromJson();
    $log.log("promise :: ", promise);

    var wholeData = {};

    promise.then(
        function (callBack) {
            $log.log("Call Back :: ", callBack);
            wholeData = callBack;
            $log.info("wholeData :: ", wholeData);
        }, function (errBack) {
            $log.error("Err Back :: ", errBack);
        }, function (progressBack) {
            $log.log("Progress Back :: ", progressBack);
        }
    );

    function getObjectFromJson() {

        var jsonUrl = "api/mainData.json";

        var defer = $q.defer();
        $http.get(jsonUrl).then(
            function (result) {
                defer.resolve(result.data);
            },
            function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    factoryObject.getWholeData = function () {
        return wholeData;
    }

    return factoryObject;
}]);