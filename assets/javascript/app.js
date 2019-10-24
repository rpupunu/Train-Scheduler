// CONFIG TO INITIALIZE FIREBASE 
// var firebaseConfig = {
//     apiKey: "AIzaSyA3lQu1IGvfk-VNNCrwaNjngkxAehDzNYc",
//     authDomain: "train-scheduler-fa2d4.firebaseapp.com",
//     databaseURL: "https://train-scheduler-fa2d4.firebaseio.com",
//     projectId: "train-scheduler-fa2d4",
//     storageBucket: "train-scheduler-fa2d4.appspot.com",
//     messagingSenderId: "263713409512",
//     appId: "1:263713409512:web:5103d832464d63ac6a7c5d",
//     measurementId: "G-XD3ZVT33C5"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBQV7skrnof5LkcbuB9jVd7qbMb4nTjOpA",
    authDomain: "train-app-b38e4.firebaseapp.com",
    databaseURL: "https://train-app-b38e4.firebaseio.com",
    projectId: "train-app-b38e4",
    storageBucket: "train-app-b38e4.appspot.com",
    messagingSenderId: "126597731751",
    appId: "1:126597731751:web:c8c30857fd307c23399282",
    measurementId: "G-Y1C0PL2Z5G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// var trainName = "";
// var trainDestination = "";
// var trainStart = "";
// var trainFrequency = "";

// onClick event to add trains to the database
$("#submit-train-btn").on("click", function(event)  {
    event.preventDefault();


    // var to grab user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();

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
    console.log(newTrain.name + " successfully added!");

    $('#train-input').val("");
    $('#destination-input').val("");
    $('#start-input').val("");
    $('#frequency-input').val("");

    // $('#current-table').html("");
});

//FIREBASE EVENT TO ADDED TRAINS TO THE DATABASE AND APPEND THE VALUES TO THE EXISTING TRAIN TABLE
database.ref().on("child_added", function(childSnapshot) {
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
    $('#train-table > tbody').append(newRow);
});
