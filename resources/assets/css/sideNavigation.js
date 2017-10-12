
function openSideNavigation() {
	document.getElementById("sideNavigation").style.width = "250px";
	document.getElementById("container").style.marginLeft = "250px";

	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeSideNavigation() {
	document.getElementById("sideNavigation").style.width = "0";
	document.getElementById("container").style.marginLeft = "5%";
	
	document.body.style.backgroundColor = "#f6f7f4";
}