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
    events: function(start,end,callback) {
      $.ajax({
        url: '/backliftapp/show',
        type: 'GET',
        datatype: 'JSON',
        success: function(object) {
          var events = [];
          $(object).find('event').each(function(){
            events.push({
            event.allDay = event.allDay == "true"
            });
          });
          callback(events);
        };
      });
    };, //end events function

    // success functiion goes here, with events callback


    // Prints show values when an Event is Clicked
    eventClick: function(calEvent, view, allDay) {

        $('#iTable').fullCalendar({

            defaultView: 'agendaDay',
            editable: false,
            events: {
                url: "/backliftapp/show",
                type: "GET",
                datatype: "JSON"
            }

        })
        $('#iTable').fullCalendar('gotoDate', new Date(calEvent.start));

        // Prints hotel and map info to page
        $("#hotelInfo").html('Hotel Info: ' + '<br>' + calEvent.hotelName + '<br>' + calEvent.hotelAddress + '<br>' + calEvent.venueCity + ', ' + calEvent.venueState);
        $("#mapImage").html("Googel API goes here!");

        // change the border color just for fun
        $(this).css('border-color', 'red');

    }//end eventClick

  });//end fullCalendar

});//end doc ready