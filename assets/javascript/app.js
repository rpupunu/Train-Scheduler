// CONFIG TO INITIALIZE FIREBASE 
var firebaseConfig = {
    apiKey: "AIzaSyA3lQu1IGvfk-VNNCrwaNjngkxAehDzNYc",
    authDomain: "train-scheduler-fa2d4.firebaseapp.com",
    databaseURL: "https://train-scheduler-fa2d4.firebaseio.com",
    projectId: "train-scheduler-fa2d4",
    storageBucket: "train-scheduler-fa2d4.appspot.com",
    messagingSenderId: "263713409512",
    appId: "1:263713409512:web:5103d832464d63ac6a7c5d",
    measurementId: "G-XD3ZVT33C5"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// onClick event to add trains to the database
$('#submit-train-btn').on('click', function(event)  {
    event.preventDefault();

    // var to grab user input
    var trainName = $('#train-input').val().trim();
    console.log(trainName);
    var trainDestination = $('#destination-input').val().trim();
    console.log(trainDestination);
    var trainStart = $('#start-input').val().trim();
    console.log(trainStart);
    var trainFrequency = $('#frequency-input').val().trim();
    console.log(trainFrequency);

    // new object to store values to push to Firease
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency,
    };

    database.ref().push(newTrain);
    
    // Console log the values in the new object
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    // Alert that a new train had been added 
    alert(newTrain.name + " successfully added!");

    $('#train-input').val('');
    $('#destination-input').val('');
    $('#start-input').val('');
    $('#frequency-input').val('');
});

//FIREBASE EVENT TO ADDED TRAINS TO THE DATABASE AND APPEND THE VALUES TO THE EXISTING TRAIN TABLE
database.ref().on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination)
    console.log(trainStart);
    console.log(trainFrequency);

    // FIRST TIME
    var convertedTime = moment(trainStart, 'HH:mm').subtract(1, 'years');
    console.log('time: ' + trainStart + ' converted: ' + convertedTime);

    // CURRENT TIME
    var currTime = moment();
    console.log('Current time: ' + moment(currTime).format('hh:mm'));

    // DIFFERENCE BETWEEN CURRENT TIME AND FIRST TIME
    var diffTime = moment().diff(moment(convertedTime), 'minutes');
    console.log('Difference in time: ' + diffTime);

    // TIME APART/ REMAINDER
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // MINTUES UNTIL NEXT TRAIN
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log('Minutes until train: ' + tMinutesTillTrain);

    // NEXT TRAIN
    var nextTrain = moment().add(tMinutesTillTrain, 'minutes');
    var nextTrain2 = moment(nextTrain).format('hh:mm');
    console.log('Arrival time: ' + moment(nextTrain).format('hh:mm'));

    // CREATE NEW ROW IN THE TABLE
    var newRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(trainDestination),
        $('<td>').text(trainFrequency),
        $('<td>').text(nextTrain2),
        $('<td>').text(tMinutesTillTrain)
    );

    // APPEND THE NEW ROW TO THE TABLE
    $('#current-table > tbody').append(newRow);
});

