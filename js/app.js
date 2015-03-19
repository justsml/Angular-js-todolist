"use strict";

var App = angular.module("score", ["LocalStorageModule"]);

App.controller("ScoreCtrl", ['$scope', 'localStorageService', function ($scope, localStorageService) {

	$scope.init = function _init() {

		if (!localStorageService.get("scoreList")) {
			$scope.model = [
				{
					name: "Science", list: [
						{ student: "Hingle McCringleberry", grade: 98 },
						{ student: "Leger Douzable", grade: 72 },
						{ student: "Prince Amukamara", grade: 60 },
						{ student: "Frostee Rucker", grade: 50 }
					]
				}, {
					name: "Data Theory", list: [
						{ student: "Blyrone Blashington", grade: 40 },
						{ student: "D'Brickashaw Ferguson", grade: 99 }
					]
				}
			];
		}else{
			$scope.model = localStorageService.get("scoreList");
		}
		$scope.currentShow = 0;
	};

	$scope.addScore = function _addScore() {
		var newObj = $scope.create && $scope.create.student ? $scope.create : {student: '', grade: 0 };
		$scope.model[$scope.currentShow].list.splice(0, 0, newObj);
		/*Reset the Field*/
		$scope.create = {student: '', grade: 0};
	};

	$scope.deleteScore = function _deleteScore(index) {
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};

	$scope.scoreSortable = {
		containment: "parent",//Dont let the user drag outside the parent
		cursor: "move",//Change the cursor icon on drag
		tolerance: "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
	};

	$scope.changeScore = function _changeScore(i) {
		$scope.currentShow = i;
	};

	$scope.$watch("model", function _modelUpd(newVal, oldVal) {
		// wow, this won't scale... TODO: Update model persistance
		if (newVal !== null && angular.isDefined(newVal) && newVal !== oldVal) {
			localStorageService.add("scoreList", angular.toJson(newVal));
		}
		var list = $scope.model[$scope.currentShow].list;
		$scope.updateSummary(list);

	},true);

	$scope.updateSummary = function _summary(list) {
		list = list || $scope.model[$scope.currentShow].list;//set default
		if ( list && list.length > 0 ) {
			var sortedData	= _.sortBy(list, 'grade'),
					gradesTotal = sortedData.reduce(function(a, b) { return a + b.grade && b.grade || b; });;

			$scope.minScore = sortedData[0].grade;
			$scope.maxScore = sortedData[sortedData.length-1].grade;
			$scope.avgScore = gradesTotal / sortedData.length;
		} else {
			$scope.minScore = 100;
			$scope.maxScore = 100;
			$scope.avgScore = 100;
		}
	}

}]);