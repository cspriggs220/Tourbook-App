$(document).ready(function(){

//********** jQuery Calendar Plugin *******************
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    defaultView: 'month',
    allDayDefault: false,
    editable: false,

    //Plugin call to pull data from Backlift
    events: getEvents,

    // Prints day view + show values when an Event is Clicked
    eventClick: viewShow,
  });//end fullCalendar

});//end doc ready