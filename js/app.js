$(function() {
	//We instantiate our model
	var model = new Model();

	startView = new StartView($("#start-view"), model);
	startViewController = new StartViewController(startView, model);
	planningView = new PlanningView($("#planning-view"), model);
	planningViewController = new PlanningViewController(planningView, model);
	});
