
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAF1CrjikyYoE-vzV_Udo1zZj8uyGQn9mE",
    authDomain: "nebitrain-scheduler.firebaseapp.com",
    databaseURL: "https://nebitrain-scheduler.firebaseio.com",
    projectId: "nebitrain-scheduler",
    storageBucket: "nebitrain-scheduler.appspot.com",
    messagingSenderId: "64324489232"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // values

  var trainName = "";
  var destination = "";
  var frequency = 0;
  // var firstTrainTime = "";
  var minutesAway = "";
  var trainArrival = "";

$("#addTrain").on("click", function(event) {
    event.preventDefault();
    
	 trainName = $("#trainName").val();
     destination = $("#destination").val().trim();
     frequency = $("#frequency").val().trim();
     firstTrainTime = $("#firstTrainTime").val().trim(); 

     console.log(firstTrainTime)

       // momentJS();


var tFrequency = frequency;

        console.log(tFrequency)


    // Time is 3:30 AM
    // var firstTime = "03:00";

    var firstTime = firstTrainTime;

    console.log(firstTime)

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    console.log(firstTimeConverted);222

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainArrival = moment(nextTrain).format("hh:mm");

    // database.ref().push({ 
    //   trainArrival: trainArrival

    // })

    console.log(trainArrival);

      
	database.ref().push({
		trainName: trainName,
		destination: destination,
		frequency: frequency, 
    trainArrival: trainArrival,
		firstTrainTime: firstTrainTime,
    tMinutesTillTrain: tMinutesTillTrain,
		dateAdded: firebase.database.ServerValue.TIMESTAMP	
	});

});

// function addDatabaseInfo () {


database.ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrainTime);
  console.log(childSnapshot.val().trainArrival);
  // console.log(childSnapshot.val().minutesAway);
	console.log(childSnapshot.val().dateAdded);



	var childSnapshotVal = childSnapshot.val();


	  $("#tableBody").append("<tr><td> " + childSnapshotVal.trainName + 
	  	" </td><td class='destination'> " + childSnapshotVal.destination + 
	  	" </td><td class='frequency'> " + childSnapshotVal.frequency +
	  	" </td><td class='trainArrival'> " + childSnapshotVal.trainArrival +
      " </td><td class='tMinutesTillTrain'> " + childSnapshotVal.tMinutesTillTrain +
	  	" </td></tr>");
})

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

var sv = snapshot.val();

	  // console.log(sv.name);
   //console.log(sv.destination);
   //console.log(sv.frequency);
   //console.log(sv.firstTrainTime);


$("#trainName").text(snapshot.val().trainName);
$("#destination").text(snapshot.val().destination)
$("#frequency").text(snapshot.val().frequency)
$("#firstTrainTime").text(snapshot.val().firstTrainTime)

});