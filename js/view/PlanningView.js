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
            var text = document.createTextNode(currentActivity.getName() + "  -  " + currentActivity.getLength() + " mins");
   			//activity.innerHTML = currentActivity.getName()
            activity.appendChild(text);
         
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
            var startStr = model.days[i].getStart();
            var startHrs = startStr.substring(0,2);
            var startMins = startStr.substring(3,4);

            var totalLength = parseInt(startHrs)*60 + parseInt(startMins);
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


            totalLength = currentActivity.getLength() + totalLength;
            var hours = Math.floor(totalLength/60);
            var minutes = ((totalLength-(hours*60))) % 60;
            var text = document.createTextNode(hours + ":" + minutes +
                                                 "  -  " + currentActivity.getName());
            dayActivity.appendChild(text);

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
         var dayContainer = document.createElement("div");
         dayContainer.setAttribute("id", "day-div");
         dayContainer.setAttribute("class", "day-div");

         var dayHeader = document.createElement("div");
         dayHeader.setAttribute("id", "day-table-head");
         dayHeader.setAttribute("class", "day-header");
         var startTime = model.days[i].getStart();
         var endTime = model.days[i].getEnd();
         dayHeader.innerHTML = "Day " + (i+1) + "<br/>Start: " + startTime +
                               "<br/>End: " + endTime;

         //dayHeader.appendChild(dayText);
         var totalLength = model.days[i].getTotalLength();
         var headerChart = document.createElement("div");
         headerChart.setAttribute("class", "bar-container");


         var barSizePres = Math.floor(100*(model.days[i].getLengthByType(0)/totalLength));
         var presentationChart = document.createElement("div");
         barSizePresStr = "height: "+String(barSizePres)+"%";
         presentationChart.setAttribute("class", "bar presentation");
         presentationChart.setAttribute("style", barSizePresStr)// FIXME: time

         var barSizeGroup = Math.floor(100*(model.days[i].getLengthByType(1)/totalLength));
         var groupChart = document.createElement("div");
         groupChart.setAttribute("class", "bar group");
         barSizeGroupStr = "height: "+String(barSizeGroup)+"%";
         groupChart.setAttribute("style", barSizeGroupStr);

         var barSizeDiscussion = Math.floor(100*(model.days[i].getLengthByType(2)/totalLength));
         var discussionChart = document.createElement("div");
         discussionChart.setAttribute("class", "bar group");
         var barSizeDiscussionStr = "height: "+String(barSizeDiscussion)+"%";
         discussionChart.setAttribute("class", "bar discussion");
         discussionChart.setAttribute("style", barSizeDiscussionStr);

         var barSizeBreak = Math.floor(100*(model.days[i].getLengthByType(3)/totalLength));
         var breakChart = document.createElement("div");
         barSizeBreakStr = "height: "+ String(barSizeBreak)+"%";
         breakChart.setAttribute("class", "bar break");
         breakChart.setAttribute("style", barSizeBreakStr);

         headerChart.appendChild(presentationChart);
         headerChart.appendChild(groupChart);
         headerChart.appendChild(discussionChart);
         headerChart.appendChild(breakChart);

         dayHeader.appendChild(headerChart);

         dayContainer.appendChild(dayHeader);

         var daySortable = document.createElement("ul");
         daySortable.setAttribute("id", "day-container");
         daySortable.setAttribute("class", "connectedSortable");
         daySortable.setAttribute("nr", i);

         dayContainer.appendChild(daySortable);

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

	this.update = function(arg){
		renderDays();
		renderActivities();
   }
}

