/**
 * Created by fission on 8/14/2014.
 */

myApp.controller("navbarCtrl", ["$scope", "$rootScope", "$log", "$location", function ($scope, $rootScope, $log, $location) {
    $rootScope.showUserName = false;
    $rootScope.signedInUser = "";
    $rootScope.currentPath = "";

    $scope.logout = function () {
        $location.path("/");
        $rootScope.currentPath = "/";
        $rootScope.showUserName = false;
    }
}]);

myApp.controller("loginPageCtrl", ["$scope", "$rootScope", "$log", "$modal", "$location", "$routeParams", "getDataFactory", function ($scope, $rootScope, $log, $modal, $location, $routeParams, getDataFactory) {

    $scope.selectedProjects = {};
    $scope.selectedTechnologies = {};
    $scope.clickedStaySigned = "";

    $scope.empAccordion = 12;
    $scope.projAccordion = 12;
    $scope.techAccordion = 12;

    $scope.showEmpCheckBoxes = false;
    $scope.showProjCheckBoxes = false;
    $scope.showTechCheckBoxes = false;

    $scope.empOrderBy = "name";
    $scope.projOrderBy = "projects";
    $scope.techOrderBy = "technology";

    $scope.wholeData = getDataFactory.getWholeData();
    $log.info("$scope.wholeData :: ", $scope.wholeData);

    $scope.users = $scope.wholeData.users;
    $scope.employees = $scope.wholeData.employees;
    $scope.projects = $scope.wholeData.projects;
    $scope.technologies = $scope.wholeData.technologies;

    jQuery("#signupSuccess").hide();
    jQuery("#errorLogin").hide();
    jQuery("#signupError").hide();
    jQuery("#multiPurposeAlert").hide();

    $scope.alertClass = "success";
    $scope.alertText = "The record has been added successfully";

    $scope.authenticateUser = function (uname, pwd) {
        var temp = false;
        $scope.users.forEach(function (val, key) {
            if (val.uname == uname || val.email == uname) {
                if (val.pwd == pwd) {
                    temp = true;
                    $rootScope.signedInUser = val.uname;
                }
            }
        });

        if (temp == true) {
            $rootScope.showUserName = true;

            if ($scope.clickedStaySigned == true) {
                $log.info("In Stay signed in checked.");
            } else {
                $log.info("In   Stay signed in unchecked.");
            }
            $location.path("/userPage");
            $rootScope.currentPath = "/userPage";

        } else {
            jQuery("#errorLogin").slideDown();
            setTimeout(function () {
                jQuery("#errorLogin").slideUp();
            }, 4000);
        }
    };

    $scope.createNewUser = function () {

        if ($scope.newUser.pwd == $scope.newUser.pwd2) {

            $scope.newUser = {
                uname: $scope.newUser.name,
                pwd: $scope.newUser.pwd,
                email: $scope.newUser.email
            };

            $scope.users.push($scope.newUser);
            $location.path("/");

        } else {

            jQuery("#signupError").slideDown();

            setTimeout(function () {
                jQuery("#signupError").slideUp();
            }, 4000);

            $log.error("Passwords mismatch. Please fill the correct data to create an account.");
        }

        setTimeout(function () {
            jQuery("#signupSuccess").slideDown();
        }, 10);

        setTimeout(function () {
            jQuery("#signupSuccess").slideUp();
        }, 4000);

        $log.info("$scope.newUser", $scope.newUser);

    };

    $scope.deleteSingleRecord = function (str, item) {
        if (str == "employees") {
            var index = $scope.employees.indexOf(item);
            $scope.employees.splice(index, 1);
        } else if (str == "projects") {
            var index = $scope.projects.indexOf(item);
            $scope.projects.splice(index, 1);
        } else if (str == "technologies") {
            var index = $scope.technologies.indexOf(item);
            $scope.technologies.splice(index, 1);
        }

        $scope.alertClass = "success";
        $scope.alertText = "The record has been deleted successfully";
        jQuery("#multiPurposeAlert").slideDown();

        setTimeout(function () {
            jQuery("#multiPurposeAlert").slideUp();
        }, 4000);

    };

    $scope.selectMultipleRecords = function (str) {
        if (str == "employees") {
            $scope.showEmpCheckBoxes = !$scope.showEmpCheckBoxes;
            $scope.empAccordion = 11;
        } else if (str == "projects") {
            $scope.showProjCheckBoxes = !$scope.showProjCheckBoxes;
            $scope.projAccordion = 11;
        } else if (str == "technologies") {
            $scope.showTechCheckBoxes = !$scope.showTechCheckBoxes;
            $scope.techAccordion = 11;
        }
    };

    $scope.cancelMultipleRecords = function (str) {
        if (str == "employees") {
            $scope.showEmpCheckBoxes = !$scope.showEmpCheckBoxes;
            $scope.empAccordion = 12;
        } else if (str == "projects") {
            $scope.showProjCheckBoxes = !$scope.showProjCheckBoxes;
            $scope.projAccordion = 12;
        } else if (str == "technologies") {
            $scope.showTechCheckBoxes = !$scope.showTechCheckBoxes;
            $scope.techAccordion = 12;
        }
    };

    $scope.empMarkedArr = [];
    $scope.projMarkedArr = [];
    $scope.techMarkedArr = [];

    $scope.markRecordsToDelete = function (str, obj) {

        if (str == "employees") {
            $scope.empMarkedArr.push(obj);
//            $log.log("$scope.empMarkedArr : ", $scope.empMarkedArr);

            for (var i = 0; i < $scope.empMarkedArr.length; i++) {
                for (var j = i + 1; j < $scope.empMarkedArr.length; j++) {
                    if ($scope.empMarkedArr[i] == $scope.empMarkedArr[j]) {
//                        $log.log("matched at i = ",i,"j = ",j);
                        $scope.empMarkedArr.splice(j, 1);
//                        $log.log("after first splice ",$scope.empMarkedArr);
                        $scope.empMarkedArr.splice(i, 1);
//                        $log.log("after second splice ",$scope.empMarkedArr);
                    }
                }
            }

        }
        if (str == "projects") {
            $scope.projMarkedArr.push(obj);
//            $log.log("$scope.projMarkedArr : ", $scope.projMarkedArr);
            for (var i = 0; i < $scope.projMarkedArr.length; i++) {
                for (var j = i + 1; j < $scope.projMarkedArr.length; j++) {
                    if ($scope.projMarkedArr[i] == $scope.projMarkedArr[j]) {
                        $scope.projMarkedArr.splice(j, 1);
                        $scope.projMarkedArr.splice(i, 1);
                    }
                }
            }
        }
        if (str == "technologies") {
            $scope.techMarkedArr.push(obj);
//            $log.log("$scope.techMarkedArr : ", $scope.techMarkedArr);
            for (var i = 0; i < $scope.techMarkedArr.length; i++) {
                for (var j = i + 1; j < $scope.techMarkedArr.length; j++) {
                    if ($scope.techMarkedArr[i] == $scope.techMarkedArr[j]) {
                        $scope.techMarkedArr.splice(j, 1);
                        $scope.techMarkedArr.splice(i, 1);
                    }
                }
            }
        }
    };

    $scope.deleteMultipleRecords = function (str) {
        if (str == "employees") {
            $scope.showEmpCheckBoxes = !$scope.showEmpCheckBoxes;
            $scope.empAccordion = 12;

            var tempCount = 0;

            angular.forEach($scope.empMarkedArr, function (val, key) {
//                $log.log("val : ", val);
                var index = $scope.employees.indexOf(val);
                $scope.employees.splice(index, 1);
                tempCount = tempCount + 1;
            });

            $scope.empMarkedArr = [];

        } else if (str == "projects") {
            $scope.showProjCheckBoxes = !$scope.showProjCheckBoxes;
            $scope.projAccordion = 12;

            var tempCount = 0;

            angular.forEach($scope.projMarkedArr, function (val, key) {
                var index = $scope.projects.indexOf(val);
                $scope.projects.splice(index, 1);
                tempCount = tempCount + 1;
            });

            $scope.projMarkedArr = [];
            $scope.selectedProjects = {};

        } else if (str == "technologies") {
            $scope.showTechCheckBoxes = !$scope.showTechCheckBoxes;
            $scope.techAccordion = 12;

            var tempCount = 0;

            angular.forEach($scope.techMarkedArr, function (val, key) {
                var index = $scope.technologies.indexOf(val);
                $scope.technologies.splice(index, 1);
                tempCount = tempCount + 1;
            });

            $scope.techMarkedArr = [];
            $scope.selectedTechnologies = {};
        }

        if (tempCount > 0) {
            $scope.alertClass = "success";
            $scope.alertText = "The marked records have been deleted successfully";
            jQuery("#multiPurposeAlert").slideDown();

            setTimeout(function () {
                jQuery("#multiPurposeAlert").slideUp();
            }, 4000);
        } else {
            $scope.alertClass = "info";
            $scope.alertText = "No record has been marked. So no record has been deleted";
            jQuery("#multiPurposeAlert").slideDown();

            setTimeout(function () {
                jQuery("#multiPurposeAlert").slideUp();
            }, 4000);
        }

    };

    $scope.addNewRecord = function (str) {
        if (str == "employees") {
            $log.log("hgfhfhgfhg");
            $location.path("/addEmployee");
        } else if (str == "projects") {
            $location.path("/addProject");
        } else if (str == "technologies") {
            $location.path("/addTechnology");
        }
    };

    $scope.discardRecord = function () {
        $location.path("/userPage")
    };

    $scope.commitRecord = function (str, obj) {
        if (str == "employees") {
            $scope.employees.push(obj);
            $location.path("/userPage");
        } else if (str == "projects") {
            $scope.projects.push(obj);
            $location.path("/userPage");
        } else if (str == "technologies") {
            $scope.technologies.push(obj);
            $location.path("/userPage");
        }

        setTimeout(function () {
            jQuery("#multiPurposeAlert").slideDown();
        }, 10);

        setTimeout(function () {
            jQuery("#multiPurposeAlert").slideUp();
        }, 4000);

    };


    $scope.openEditModal = function (str, index, id) {

        var tempUrl;
        $scope.currentData = {};

        if (str == 'employees') {

            var name = $scope.employees[index].name;
            var empid = $scope.employees[index].empid;
            var designation = $scope.employees[index].designation;
            var platform = $scope.employees[index].platform;
            var email = $scope.employees[index].email;
            var phone = $scope.employees[index].phone;
            var dob = $scope.employees[index].dob;

            $scope.currentData = {
                name: name,
                empid: empid,
                designation: designation,
                platform: platform,
                email: email,
                phone: phone,
                dob: dob
            };

            tempUrl = "editEmployeeTemplate.html";
        } else if (str == 'projects') {

            var project = $scope.projects[index].project;
            var members = $scope.projects[index].members;
            var release = $scope.projects[index].release;
            var duration = $scope.projects[index].duration;

            $scope.currentData = {
                project: project,
                members: members,
                release: release,
                duration: duration
            };

            tempUrl = "editProjectTemplate.html";
        } else if (str == 'technologies') {

            var technology = $scope.technologies[index].technology;
            var version = $scope.technologies[index].version;
            var duration = $scope.technologies[index].duration;
            var usingin = $scope.technologies[index].usingin;

            $scope.currentData = {
                technology: technology,
                version: version,
                duration: duration,
                usingin: usingin
            };

            tempUrl = "editTechnologyTemplate.html";
        }

        var modalInstance = $modal.open({
            templateUrl: tempUrl,
            controller: "ModalInstanceCtrl",
            resolve: {
                getCurrentData: function () {
                    return $scope.currentData;
                }
            }
        });

        modalInstance.result.then(function () {

            if (str == 'employees') {
                $scope.employees[index] = $scope.currentData;
            } else if (str == 'projects') {
                $scope.projects[index] = $scope.currentData;
            } else if (str == 'technologies') {
                $scope.technologies[index] = $scope.currentData;
            }

            $scope.alertClass = "success";
            $scope.alertText = "The record has been updated successfully";
            jQuery("#multiPurposeAlert").slideDown();

            setTimeout(function () {
                jQuery("#multiPurposeAlert").slideUp();
            }, 4000);

            $log.info('Record updated at : ' + new Date());
        }, function () {
            $log.info('Modal dismissed at : ' + new Date());
        });
    };

}]);

myApp.controller("ModalInstanceCtrl", function ($scope, $log, $modalInstance, getCurrentData) {

    $scope.items = getCurrentData;

    $scope.updateRecord = function () {
        $log.log("$scope.items:",$scope.items);
        $modalInstance.close('ok');
    };

    $scope.discardUpdate = function () {
        $modalInstance.dismiss('cancel');
    };
});