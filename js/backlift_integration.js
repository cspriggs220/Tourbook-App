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

//********* Prints all show data when an Event is Clicked ************
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
        $("#hotelInfo").html('<strong>Venue Info: </strong>' + '<br>' + calEvent.venueName + '<br>' + calEvent.venueAddress  + '<hr>' + '<strong>Hotel Info: </strong>' + '<br>' + calEvent.hotelName + '<br>' + calEvent.hotelAddress);

        // change the border color just for fun
        $(this).css('border-color', 'red');

        // Google Map API for this event
        var lat = parseFloat(calEvent.geocode[0]);
        var lng = parseFloat(calEvent.geocode[1]);
        var myLocation = new google.maps.LatLng(lat, lng);
        var mapOptions = {
          center: myLocation,
          zoom:13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        var currentCenter = map.getCenter();

        $('a[href="#mapContainerTab"]').on('shown', function(e){
            google.maps.event.trigger(map, 'resize');
            // re-Center the map due to hidden tab div
            map.setCenter(currentCenter);
        });

        // Map Marker to appear on location
        var marker = new google.maps.Marker({
          position: myLocation,
          title:'Click to zoom',
          map: map
        });

        marker.setMap(map);

        // Zoom to 17 when clicking on marker
        google.maps.event.addListener(marker,'click',function() {
          map.setZoom(17);
          map.setCenter(marker.getPosition());
        });

}//end viewShow