$(document).ready(function(){

// Google Map API variables
  var geocoder;
  var address;
  var map;
//********** Date Picker Plugin ***********************
  $('#dp1').datepicker();

//********** Time Picker Plugin ***********************
  $('#timeStart').timepicker({
    minuteStep: 15,
    showInputs: true,
    template: 'modal',
    defaultTime: '07:00 PM',
    modalBackdrop: true,
    showSeconds: false,
    showMeridian: true
  });//end time Start

  $('#timeEnd').timepicker({
    minuteStep: 15,
    showInputs: true,
    template: 'modal',
    defaultTime: '09:00 PM',
    modalBackdrop: true,
    showSeconds: false,
    showMeridian: true
  })//end time End

//********* Create Event and send data to Backlift ****************
  //Add Event Submit Click
  $('#addEvent').on('click', function(){

    //variable to store date selected
    var date = $('#datePicker').val();
    var dateVal = date.split(/[/]/);
    // var eventDate = new Date(date).toJSON();

    //variable to store showtime date and time values
    var startVal = $('#timeStart').val();
    var endVal = $('#timeEnd').val();

    //time format conversion
    timeStart = startVal.split(/[: ]/);
    timeStart[0] = parseInt(timeStart[0]);
    //add 12hrs to selected time if in the PM
    if(timeStart[2] == 'PM') {
      timeStart[0] += 12
    }

    timeEnd = endVal.split(/[: ]/); 
    timeEnd[0] = parseInt(timeEnd[0]);
    if(timeEnd[2] == 'PM') {
      timeEnd[0] += 12
    } 

    //default Itinerary events
    var startLunchVal = '12:00';
    lunchStart = startLunchVal.split(/[:]/);
    lunchStart[0] = parseInt(lunchStart[0]);

    var endLunchVal = '01:00 PM';
    lunchEnd = endLunchVal.split(/[: ]/);
    lunchEnd[0] = parseInt(lunchEnd[0]);
    if(lunchEnd[2] == 'PM') {
      lunchEnd[0] += 12
    }

    var startSoundVal = '03:00 PM';
    soundStart = startSoundVal.split(/[: ]/);
    soundStart[0] = parseInt(soundStart[0]);
    if(soundStart[2] == 'PM') {
      soundStart[0] += 12
    }

    var endSoundVal = '05:00 PM';
    soundEnd = endSoundVal.split(/[: ]/);
    soundEnd[0] = parseInt(soundEnd[0]);
    if(soundEnd[2] == 'PM') {
      soundEnd[0] += 12
    }

    var startDinnerVal = '06:00 PM';
    dinnerStart = startDinnerVal.split(/[: ]/);
    dinnerStart[0] = parseInt(dinnerStart[0]);
    if(dinnerStart[2] == 'PM') {
      dinnerStart[0] += 12
    }

    var endDinnerVal = '08:00 PM';
    dinnerEnd = endDinnerVal.split(/[: ]/);
    dinnerEnd[0] = parseInt(dinnerEnd[0]);
    if(dinnerEnd[2] == 'PM') {
      dinnerEnd[0] += 12
    }

    // googleMaps call
    getGeoCode(function (lat, lng){

        //send data to Backlift
         $.ajax({
          url: 'backliftapp/show',
          type: 'POST',
          datatype: 'JSON',
          data:JSON.stringify( {
              title: $('#inputTitle').val(),
              start: new Date(dateVal[2],dateVal[0]-1,dateVal[1],0,0),
              itinerary: [
                {
                  title: "Showtime",
                  start: new Date(dateVal[2],dateVal[0]-1,dateVal[1],timeStart[0]-5,timeStart[1]),
                  end: new Date(dateVal[2],dateVal[0]-1,dateVal[1],timeEnd[0]-5,timeEnd[1])
                },
                {
                  title: "Lunch",
                  start: new Date(dateVal[2],dateVal[0]-1,dateVal[1],lunchStart[0]-5,lunchStart[1]),
                  end: new Date(dateVal[2],dateVal[0]-1,dateVal[1],lunchEnd[0]-5,lunchEnd[1])
                },
                {
                  title: "Soundcheck",
                  start: new Date(dateVal[2],dateVal[0]-1,dateVal[1],soundStart[0]-5,soundStart[1]),
                  end: new Date(dateVal[2],dateVal[0]-1,dateVal[1],soundEnd[0]-5,soundEnd[1])
                },
                {
                  title: "Dinner",
                  start: new Date(dateVal[2],dateVal[0]-1,dateVal[1],dinnerStart[0]-5,dinnerStart[1]),
                  end: new Date(dateVal[2],dateVal[0]-1,dateVal[1],dinnerEnd[0]-5,dinnerEnd[1])
                }
              ],
              geocode: [lat,lng],
              venueName: $('#inputVenueName').val(),
              venueAddress: $('#inputAddress').val(),
              hotelName: $('#inputHotelName').val(),
              hotelAddress: $('#inputHotelAddress').val()
          }),
          contentType: 'application/json',
          success: function(data){
            //refetch full calendar
            $('#calendar').fullCalendar('refetchEvents');
          }
        });//end POST
    });//end getGeoCode
  });//end click

//********** jQuery Calendar Plugin *******************
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    defaultView: 'month',
    // allDayDefault: false,
    editable: false,
    //Plugin call to pull data from Backlift (backlift_integration.js)
    events: getEvents,
    // Prints Itinerary when an Event is Clicked (backlift_integration.js)
    eventClick: viewShow,
  });//end fullCalendar


});//end doc ready