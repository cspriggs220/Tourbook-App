//********* Plugin call to pull data from Backlift ****************
function getEvents(start,end,callback) {
      $.ajax({
        url: '/backliftapp/show',
        type: 'GET',
        datatype: 'JSON',
        success: function(shows) { 
          callback(shows);
        }//end success
      })//end GET
} //end events function

//********* Prints day view + show values when an Event is Clicked ************

function viewShow(calEvent, view, allDay,callback) {

        // Clear out div upon each click
        $('#iTable').html('');
        // Show new calendar on right side of page
        $('#iTable').fullCalendar({
            header: {
              left: '',
              center: '',
              right: ''
            },
            defaultView: 'agendaDay',
            allDayDefault: false,
            editable: false,
            firstHour: 11,
            contentHeight: 400,
            events: function(start,end,callback) {
              callback(calEvent.itinerary);
            }
        });

        // Changes the new calendar to view current date
        $('#iTable').fullCalendar('gotoDate', new Date(calEvent.start));

        // Prints hotel and map info to page
        $("#hotelInfo").html('Hotel Info: ' + '<br>' + calEvent.hotelName + '<br>' + calEvent.hotelAddress + '<br>' + calEvent.venueCity + ', ' + calEvent.venueState);
        // $("#mapImage").html("Googel API goes here!");

        // change the border color just for fun
        $(this).css('border-color', 'red');

}//end viewShow