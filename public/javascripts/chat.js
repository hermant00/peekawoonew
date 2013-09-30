
$(function(){
	var socket = io.connect();
	var room = $("#room").val();
	socket.emit('join',{room:room});
	var user = $("#user").val();
	user = JSON.parse(user);
	var my_chatm8 = $("#chatm8").val();
	my_chatm8 = JSON.parse(my_chatm8);
	var list_gen = $("#list").val();
	//list_gen = JSON.parse(list_gen);
		
	var contmechatm8 = {};
	if(user.id == my_chatm8.male.id){
		$(".current-photo").html("<img class='cpimg' src='"+my_chatm8.female.photourl+"'></img>");
		if(list_gen.length > 0){
			$(".previous-photo").html("<img class='ppimg' src='"+JSON.parse(list_gen).photourl+"'></img>");
		}
//		for(var i = 0; i<list_gen.length; i++){
			//list_gen[i] = JSON.parse(list_gen[i]);
//			if(list_gen[i].id == my_chatm8.female.id){
//				if(i==list_gen.length-1){
					//list_gen[list_gen.length-1] = JSON.parse(list_gen[list_gen.length-1]);
//					$(".previous-photo").html("<img class='ppimg' src='"+list_gen[0].photourl+"'></img>");
//				}
//				else{
					//list_gen[i-1] = JSON.parse(list_gen[i-1]);
//					$(".previous-photo").html("<img class='ppimg' src='"+list_gen[i+1].photourl+"'></img>");
//				}
//			}
//		}
		contmechatm8 = {user: user,mate:my_chatm8.female};
	}
	else{
		$(".current-photo").html("<img class='cpimg' src='"+my_chatm8.male.photourl+"'></img>");
		if(list_gen.length > 0){
			$(".previous-photo").html("<img class='ppimg' src='"+JSON.parse(list_gen).photourl+"'></img>");
		}
//		for(var i = 0; i<list_gen.length; i++){
			//list_gen[i] = JSON.parse(list_gen[i]);
//			if(list_gen[i].id == my_chatm8.male.id){
//				if(i==0){
					//list_gen[list_gen.length-1] = JSON.parse(list_gen[list_gen.length-1]);
//					$(".previous-photo").html("<img class='ppimg' src='"+list_gen[list_gen.length-1].photourl+"'></img>");
//				}
//				else{
					//list_gen[i-1] = JSON.parse(list_gen[i-1]);
//					$(".previous-photo").html("<img class='ppimg' src='"+list_gen[i-1].photourl+"'></img>");
//				}
//			}
//		}
		contmechatm8 = {user: user,mate:my_chatm8.male};
	}
	
	socket.on('roomtopic',function(data){
		$(".messagewindow").html("<p class='topic_per_room'><strong>TOPIC: "+data+"</strong></p>");
	});	
	
	$('.ratings_chick').click(
		function(){
			if($(this).is('.ratings_chick')){
				socket.emit('uninsert',contmechatm8);
			}
			else{
				socket.emit('insert',contmechatm8);
			}
		}
	);
	
	socket.on(user.id,function(data){
		if(data){
			window.location = '/chat/'+data.name;
		}
		else{
			window.location = '/error';
		}
	});
	
	$("#signout").click(function(){
		//alert(roomsend);
		//socket.emit('leave',{user: user,room:room});
		socket.emit('leave',{user: user,room:my_chatm8});
	});
	
	socket.on('new msg',function(data){
		console.log("++++++++data++++++");
		console.log(data);
		if(data.gender == "male"){
			$(" .messagewindow").append("<img class='leftp'></img><img class='imgleft' src='"+data.photourl+"'></img><p class='me-chat'><strong>"+data.codename+":</strong> <em>"+data.msg+"</em></p>");
		}
		else{
			$(" .messagewindow").append("<img class='rightp'></img><img class='imgright' src='"+data.photourl+"'></img><p class='you-chat'><strong>"+data.codename+":</strong> <em>"+data.msg+"</em></p>");
		}
		$(".messagewindow").prop({scrollTop: $(".messagewindow").prop("scrollHeight")});
	});
	
	$("#reply").click(function(){
		var inputText = $("#message").val().trim();
		if(inputText){
			var chunks = inputText.match(/.{1,1234}/g)
			, len = chunks.length;
			for(var i = 0; i<len; i++){
				user.msg = chunks[i];
				if(user.provider=='twitter'){
					if(user.id==my_chatm8.male.id){
						user.gender = my_chatm8.male.gender;
					}
					else{
						user.gender = my_chatm8.female.gender;
					}
				}
				socket.emit('my msg',user);
			}
			$("#message").val('');
			
			return false;
		}
	});
	$("#message").keypress(function(e){
		var inputText = $(this).val().trim();
		if(e.which == 13 && inputText){
			var chunks = inputText.match(/.{1,1024}/g)
				, len = chunks.length;
			
			for(var i=0; i<len; i++) {
				user.msg = chunks[i];
				if(user.provider=='twitter'){
					if(user.id==my_chatm8.male.id){
						user.gender = my_chatm8.male.gender;
					}
					else{
						user.gender = my_chatm8.female.gender;
					}
				}
				socket.emit('my msg',user);
				//socket.emit('my msg', {
					//msg: chuncks[i]
				//});
			}
			$(this).val('');
			return false;
		}
	});
	socket.on('game_stop',function(){
		window.location = '/loading';
	});
});
