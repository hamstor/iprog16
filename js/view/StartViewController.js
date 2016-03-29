var StartViewController = function(view, model) {
	
			
	$("#start-button").click(function(){
		$("#start-view").hide();
		$("#planning-view").show();
		
		model.addDay();

		//create parked activities
		model.addActivity(new Activity("Introduction",10,0,"Introduction for this day"),0);
		model.addActivity(new Activity("Idea",20,2,"Boboddy"));
		model.addActivity(new Activity("Working in groups",20,1,"Boboddy"));
		model.addActivity(new Activity("Break",20,3,"Boboddy"));
	});
}
