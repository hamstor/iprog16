var PlanningViewController = function(view, model ) {
	//Function To Display Popup		
	$("#add-activity").click(function(){
		$("#popupAddActivity").show();
	});

	$("#add-day").click(function(){
		model.addDay();
      $(".connectedSortable").sortable("refresh");
	});

	//Confirm activity and hide popup
	$("#confirm-activity").click(function(){
		
				if (document.getElementById('name').value == "" || document.getElementById('description').value == "") {
					alert("Fill All Fields !");
					
				} 
				else if (isNaN(parseInt(document.getElementById('length').value)))   {
					alert("Must be a number");
				}
				else {
					//document.getElementById('form').submit();

					model.addActivity(new Activity(document.getElementById('name').value, document.getElementById('length').value, document.getElementById('type').value, document.getElementById('description').value));
					/*tezt

					console.log(model.parkedActivities[0].getName());
					console.log(model.parkedActivities[0].getLength());
					console.log(model.parkedActivities[0].getTypeId());
					console.log(model.parkedActivities[0].getDescription());
					*/
					$("#popupAddActivity").hide();
					document.getElementById('name').value ="Your Activity";
					document.getElementById('length').value="0";
					document.getElementById('type').value="0"; 
					document.getElementById('description').value="";

			   }
         $(".connectedSortable").sortable("refresh");
		});

	//Exit add activity to hide popup
	$("#exit-activity").click(function(){
				$("#popupAddActivity").hide();
	
	});

   // Deferred event handler when dragging activities around
   $(document).on('sortupdate', '.connectedSortable', function (event, ui) {
      var oldday = this.getAttribute("nr");
      var oldpos = $(ui.item).attr("pos");

      var newday = $(ui.item).parent().attr("nr");


      // make zeroindexed as the day header is counted to the sortable
      var newpos = ui.item.index()-1;
      var newpos = ui.item.index();

      console.log("BEFORE MOVE");
      console.log("we come from day " + oldday + " with position " + oldpos);
      console.log("we are going to day " + newday + " with position " + newpos);

      model.moveActivity(oldday, oldpos, newday,newpos);
   });
}
