var planXML = new XMLHttpRequest();
planXML.open("GET", "http://192.168.1.1/api/net/current-plmn", true);
planXML.onload = updatePlan;
planXML.send(null);

var statusXML = new XMLHttpRequest();
statusXML.open("GET", "http://192.168.1.1/api/monitoring/status", true);
statusXML.onload = updateStatus;
statusXML.send(null);

var statsXML = new XMLHttpRequest();
statsXML.open("GET", "http://192.168.1.1/api/monitoring/traffic-statistics", true);
statsXML.onload = updateStats;
statsXML.send(null);


function updateStats() {
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(statsXML.responseText,"text/xml");
	var currentUpload = bytesToMegabytes ( xmlDoc.getElementsByTagName("CurrentUpload")[0].childNodes[0].nodeValue );
	var currentDownload = bytesToMegabytes ( xmlDoc.getElementsByTagName("CurrentDownload")[0].childNodes[0].nodeValue );
	var currentTotal = bytesToMegabytes ( parseFloat (xmlDoc.getElementsByTagName("CurrentUpload")[0].childNodes[0].nodeValue) + parseFloat (xmlDoc.getElementsByTagName("CurrentDownload")[0].childNodes[0].nodeValue ));
	document.getElementById("data").innerHTML = "Received/Sent (total): " + currentDownload + " / " + currentUpload + " ("+ currentTotal + ")";
}



function updateStatus() {
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(statusXML.responseText,"text/xml");
	var signalstrengh = xmlDoc.getElementsByTagName("SignalIcon")[0].childNodes[0].nodeValue;
	drawSignalIcon(signalstrengh, document.getElementById('signalCanvas'));
}

function updatePlan() {
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(planXML.responseText,"text/xml");
//	alert (planXML.responseText);
	var operatorName = xmlDoc.getElementsByTagName("FullName")[0].childNodes[0].nodeValue;
	document.getElementById("operator").innerHTML = operatorName;
}


function drawSignalIcon(_signal, drawingCanvas) {
	var context = drawingCanvas.getContext('2d');
			context.strokeStyle = "#FFFFFF";

			context.beginPath();

			if (_signal >= 1) {
				context.fillStyle = "#0000FF";
			} else {
				context.fillStyle = "#EEEEEE";
			}
			context.fillRect(0,		100,	20,		25);
			if (_signal >= 2) {
				context.fillStyle = "#0000FF";
			} else {
				context.fillStyle = "#EEEEEE";
			}
			context.fillRect(25,	75,		20,		50);
			if (_signal >= 3) {
				context.fillStyle = "#0000FF";
			} else {
				context.fillStyle = "#EEEEEE";
			}
			context.fillRect(50,	50,		20,		75);
			if (_signal >= 4) {
				context.fillStyle = "#0000FF";
			} else {
				context.fillStyle = "#EEEEEE";
			}
			context.fillRect(75,	25,		20,		100);
			if (_signal >= 5) {
				context.fillStyle = "#0000FF";
			} else {
				context.fillStyle = "#EEEEEE";
			}
			context.fillRect(100,	0,		20,		125);

			context.closePath();
			context.stroke();
			context.fill();
}

function bytesToMegabytes(bytes) {
	var num = bytes / 1024 / 1024;
	var result = Math.round(num*Math.pow(10,2))/Math.pow(10,2);
	return result;
}