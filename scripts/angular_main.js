var andrei_page = angular.module('andrei_page', []);

andrei_page.controller('controller',function($scope){
    var viewButtons = true;

    $scope.setNameEng = function(){
        viewButtons=false;
    }

    $scope.setNameFr = function(){
        viewButtons=false;
    }

    $scope.name_input = function(){
        return viewButtons;
    }

    $scope.name_is_defined = function(){
        var user_data = localStorage.getItem('user');
        if(user_data!=null && user_data.length>0){
            return true;
        }

        return false;
    }

    $scope.main_content = function(){
        if(!viewButtons){
            setName();
            $scope.myStyle = {'padding-top':'2vh','padding-bottom':'2vh'};
        }
        return !viewButtons;
    }
});
