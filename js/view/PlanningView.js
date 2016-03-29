var PlanningView = function (container, model) {
	model.addObserver(this);
	this.PlanningView = container.find("#planning-view");
	this.addActivity = container.find("#add-day");

	var name = "";
	var time; 
	var description; 
	var type;
	
	function renderActivities(){
	//Add activity to Activity table
		
		this.activities = container.find("#activity-container");
		activities.html("");
		for(i= 0; i< model.parkedActivities.length; i++){
         var currentActivity = model.parkedActivities[i]
         if(currentActivity != null){
			
   			var activity = document.createElement("li");

            var type = currentActivity.getTypeId();
            console.log("Parked :" + currentActivity.getName() + " ID: " + type);
   		   //activity.setAttribute("class", "item-wrapper" );
            switch (parseInt(type))
            {
               case 0:
                 activity.setAttribute("class", "item-wrapper presentation");
                 break
               case 1:
                  activity.setAttribute("class", "item-wrapper group-work");
                  break;
               case 2:
                  activity.setAttribute("class", "item-wrapper discussion");
                   break
               case 3:
                 activity.setAttribute("class", "item-wrapper break");
                 break;
               default:
                  activity.setAttribute("class", "item-wrapper");
            }
            activity.setAttribute("name", currentActivity.getName());
            activity.setAttribute("time", currentActivity.getLength());
            activity.setAttribute("descr", currentActivity.getDescription());
            activity.setAttribute("type", currentActivity.getTypeId());

            activity.setAttribute("pos", i);
            activity.setAttribute("day", null);
   			activity.innerHTML = currentActivity.getName();
         
   		   document.getElementById("activity-container").appendChild(activity);
         }
	   }
      connectContainers();
   }

   function renderDayActivities () {
      // will we get the parked activities aswell?
      // no as we only lookup under the days div
      var outer = document.getElementById("days");
      var allDays = outer.getElementsByTagName("ul");

      for (i=0; i < allDays.length; i++) {
			for (k=0; k<model.days[i]._activities.length; k++) {
            var currentActivity = model.days[i]._activities[k]

            var dayActivity = document.createElement("li");
            //dayActivity.setAttribute("class", "");
            var type = currentActivity.getTypeId();
            switch (parseInt(type))
            {
               case 0:
                 dayActivity.setAttribute("class", "item-wrapper presentation");
                 break
               case 1:
                  dayActivity.setAttribute("class", "item-wrapper group-work");
                  break;
               case 2:
                  dayActivity.setAttribute("class", "item-wrapper discussion");
                   break
               case 3:
                 dayActivity.setAttribute("class", "item-wrapper break");
                 break;
            }
            dayActivity.setAttribute("name", currentActivity.getName());
            dayActivity.setAttribute("time", currentActivity.getLength());
            dayActivity.setAttribute("descr", currentActivity.getDescription());
            dayActivity.setAttribute("pos", k);
      
            dayActivity.innerHTML = "Activity " + currentActivity.getName();

            allDays[i].appendChild(dayActivity);
            // setting day based on the parents nr attribute, 0 indexed
            dayActivity.setAttribute("day", dayActivity.parentNode.getAttribute("nr"));
         }
      }
   }


   function renderDays () {
      this.day = container.find("#days");
      day.html("");

      for (i=0; i<model.days.length; i++) {
         var dayContainer = document.createElement("ul");
         dayContainer.setAttribute("id", "day-container");
         dayContainer.setAttribute("class", "connectedSortable"); //needed?
         dayContainer.setAttribute("nr", i);

         var dayHeader = document.createElement("div");
         dayHeader.setAttribute("id", "activity-table-head");
         dayHeader.setAttribute("class", "day-header");
          
         var dayText = document.createTextNode("Day " + (i+1));
         dayHeader.appendChild(dayText);

         var headerChart = document.createElement("div");
         headerChart.setAttribute("class", "bar-container");
         
         var presentationChart = document.createElement("div");
         presentationChart.setAttribute("class", "bar presentation");
         presentationChart.setAttribute("style", "height: 15%")// FIXME: time

         var groupChart = document.createElement("div");
         groupChart.setAttribute("class", "bar group");
         groupChart.setAttribute("style", "height: 30%");

         var discussionChart = document.createElement("div");
         discussionChart.setAttribute("class", "bar discussion");
         discussionChart.setAttribute("style", "height: 25%");

         var breakChart = document.createElement("div");
         breakChart.setAttribute("class", "bar break");
         breakChart.setAttribute("style", "height: 30%");

         headerChart.appendChild(presentationChart);
         headerChart.appendChild(groupChart);
         headerChart.appendChild(discussionChart);
         headerChart.appendChild(breakChart);

         dayHeader.appendChild(headerChart);

         dayContainer.appendChild(dayHeader);

         document.getElementById("days").appendChild(dayContainer);
      }
      renderDayActivities();
      //connectContainers();
   }

   function connectContainers () {
      $("ul").sortable({
         connectWith: ".connectedSortable",
         items: ":not(.day-header)",
      })
   }
   function debug() {
      console.log("Currently there are " + model.days.length + " days");
      console.log("And there are " + model.parkedActivities.length + " parked activities");
      for (var days = 0; day < model.days.length; days++) {
         console.log("For day " + days + " there are " +
                        model.days[days]._activities.length + " activities");
      }
   }

	this.update = function(arg){
		renderDays();
		renderActivities();
      debug();
   }
}

