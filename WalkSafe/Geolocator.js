var serial; // variable to hold an instance of the serialport library
var options = {
    baudRate: 9600
}; // set baudrate to 9600; must match Arduino baudrate
var portName = '/dev/cu.usbmodem14301';
var buttonState = false;
var locating = false;
var counter = 0;
function setup() {
 
     serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.open(portName, options); // open a serial port @ 9600
}

function draw() {
    
    
    
    
 if(buttonState == true){
     counter++;
     if(locating == false){
         getLocation();
         locating = true;
        
         }
     
     //locationUpdate(counter);
 }else if(buttonState == false){
     console.log("Off");
     locating=false;
 }
}

function serialEvent() {
   
    var inData = serial.readStringUntil('\r\n');
    
    if (inData == 1) {
      buttonState = true;
        
    }
    else if(inData == 0) {
     buttonState = false;   
    }
//console.log("the button is :" + inData);
   
}



function serverConnected() {
    print('connected to server.');
}

function portOpen() {
    print('the serial port opened.')
}

function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

function portClose() {
    print('The serial port closed.');
}

function closingCode() {
    serial.close(portName);
    return null;
}



var display = document.getElementById("display");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    display.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
 
  var latlon = position.coords.latitude + "," + position.coords.longitude;

  var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBwHbKH4mS9lrGGB22nThkT6WQagN7zcPs";

  document.getElementById("display").innerHTML = "<img src='"+img_url+"' style='width:100%;'>";

}
//function locationUpdate(counter){
//    if (counter== 1000){
//        locating = false;
//        counter =0;
//    }
//}


