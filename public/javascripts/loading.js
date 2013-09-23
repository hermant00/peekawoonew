var socket = io.connect();
//var changePage = false;
var user = $("#user").val();
socket.emit('member',user);
user = JSON.parse(user);
socket.on(user.id,function(data){
	console.log(data);
	if(data){
		window.location = '/chat/'+data.name;
	}
	else{
		window.location = '/error';
	}

});
//window.onbeforeunload = function () {
//	if(changePage){
//		alert("panget");
//	    socket.emit('reload',user);
//	    changePage = false;
//		window.location = 'login';
//	}
//};
socket.on('game_stop',function(){
	window.location = '/loading';
});
setTimeout(function(){
	window.location = '/error';
},120000);
//$(document).unbind('keydown').bind('keydown', function (event) {
//    if (event.keyCode === 8 || event.keyCode === 116 || event.keyCode === 115) {
        //event.preventDefault();
    	changePage = true;
//    }
//});