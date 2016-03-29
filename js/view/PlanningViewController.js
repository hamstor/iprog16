
var PlanningViewController = function(view, model ) {
	//Function To Display Popup		
	$("#add-activity").click(function(){
		$("#popupAddActivity").show();
	});

	$("#add-day").click(function(){
		$("#popupAddDay").show();
//		model.addDay();
      $(".connectedSortable").sortable("refresh");
	});

	$("#confirm-day").click(function(){
		
			
			if (isNaN(parseInt(document.getElementById('time').value)))   {
				alert("Please fill in the starting time on the format HH:MM");
			}
			else {
				//document.getElementById('form').submit();

				var timeStr = String(document.getElementById("time").value);
				
				var hour = timeStr.substring(0,2)
				console.log(hour);
				var minute = timeStr.substring(3,5)
				model.addDay(parseInt(hour), parseInt(minute));
	

				$("#popupAddDay").hide();
				document.getElementById('time').value ="";


		   }
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
					$("#popupAddDay").hide();
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
	$("#exit-day").click(function(){
				$("#popupAddDay").hide();
	
	});


   // Deferred event handler when dragging activities around
   $(document).on('sortupdate', '.connectedSortable', function (event, ui) {
      var oldday = this.getAttribute("nr");
      var oldpos = $(ui.item).attr("pos");

      var newday = $(ui.item).parent().attr("nr");
      var newpos = ui.item.index();

      console.log("BEFORE MOVE");
      console.log("we come from day " + oldday + " with position " + oldpos);
      console.log("we are going to day " + newday + " with position " + newpos);

      model.moveActivity(oldday, parseInt(oldpos), newday, parseInt(newpos));
   });
}

var PlanningViewController = function(view, model ) {
	//Function To Display Popup		
	$("#add-activity").click(function(){
		$("#popupAddActivity").show();
	});

	$("#add-day").click(function(){
		$("#popupAddDay").show();
//		model.addDay();
      $(".connectedSortable").sortable("refresh");
	});

	$("#confirm-day").click(function(){
		
			
			if (isNaN(parseInt(document.getElementById('time').value)))   {
				alert("Please fill in the starting time on the format HH:MM");
			}
			else {
				//document.getElementById('form').submit();

				var timeStr = String(document.getElementById("time").value);
				
				var hour = timeStr.substring(0,2)
				console.log(hour);
				var minute = timeStr.substring(3,5)
				model.addDay(parseInt(hour), parseInt(minute));
	

				$("#popupAddDay").hide();
				document.getElementById('time').value ="";


		   }
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
					$("#popupAddDay").hide();
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
	$("#exit-day").click(function(){
				$("#popupAddDay").hide();
	
	});


   // Deferred event handler when dragging activities around
   $(document).on('sortupdate', '.connectedSortable', function (event, ui) {
      var oldday = this.getAttribute("nr");
      var oldpos = $(ui.item).attr("pos");

      var newday = $(ui.item).parent().attr("nr");

      // make zeroindexed as the day header is counted to the sortable
      if (newday != null || newday != undefined)
         var newpos = ui.item.index()-1;
      else
         var newpos = ui.item.index();

      console.log("BEFORE MOVE");
      console.log("we come from day " + oldday + " with position " + oldpos);
      console.log("we are going to day " + newday + " with position " + newpos);

      model.moveActivity(oldday, parseInt(oldpos), newday, parseInt(newpos));
   });
}

