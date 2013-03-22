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
    //Plugin call to pull data from Backlift (backlift_integration.js)
    events: getEvents,
    // Prints day view + show values when an Event is Clicked (backlift_integration.js)
    eventClick: viewShow,
  });//end fullCalendar

//********** Google Maps API *******************
  

  //object to store map properties
  function initialize() {
    var myLatlng = new google.maps.LatLng(40.7506573,-73.9934726);
    var mapOptions = {
      center: myLatlng,
      zoom:13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    // google.maps.event.trigger(map, 'resize');
    // get current center of map to be resized 
    var currentCenter = map.getCenter();

    $('a[href="#mapContainerTab"]').on('shown', function(e){
        google.maps.event.trigger(map, 'resize');
        // re-Center the map due to hidden tab div
        map.setCenter(currentCenter);
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      title:'Click to zoom',
      map: map
    });

    marker.setMap(map);

    // Zoom to 17 when clicking on marker
    google.maps.event.addListener(marker,'click',function() {
      map.setZoom(17);
      map.setCenter(marker.getPosition());
    });

  };//end initialize

  google.maps.event.addDomListener(window, 'load', initialize);

});//end doc ready