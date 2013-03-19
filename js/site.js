$(document).ready(function(){

//********** jQuery Calendar Plugin *******************
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    defaultView: 'month',
    aspectRatio: 2,
    allDayDefault: false,
    editable: false,

    //Plugin call to pull data from Backlift
    events: function(start,end,callback) {
      $.ajax({
        url: '/backliftapp/show',
        type: 'GET',
        datatype: 'JSON',
        success: function(shows) { 

        //iterate through each object within shows array and change
        //the value of .allDay to a boolean
          // $.each(shows, function(){
          //   $.each(this, function(key, value){
          //   key.allDay = (key.allDay == false);
          //   });//end .each
          // });//end .each

          callback(shows);
        }//end success
      })//end GET
    }, //end events function

    // Prints day view + show values when an Event is Clicked
    eventClick: function(calEvent, view, allDay) {

        // Show new calendar on right side of page
        $('#iTable').fullCalendar({

            defaultView: 'agendaDay',
            allDayDefault: false,
            editable: false,
            events: {
                url: "/backliftapp/show",
                type: "GET",
                datatype: "JSON"
            }
        })

        // Changes the new calendar to view current date
        $('#iTable').fullCalendar('gotoDate', new Date(calEvent.start));

        // Prints hotel and map info to page
        $("#hotelInfo").html('Hotel Info: ' + '<br>' + calEvent.hotelName + '<br>' + calEvent.hotelAddress + '<br>' + calEvent.venueCity + ', ' + calEvent.venueState);
        $("#mapImage").html("Googel API goes here!");

        // change the border color just for fun
        $(this).css('border-color', 'red');

    }//end eventClick

  });//end fullCalendar

});//end doc ready