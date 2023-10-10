
function userClick(c) {
    document.getElementById('isuser').value = "USER"
    document.getElementById('tmpuser').value = c;
    return false;
}

function clickGroup(e) {
    document.getElementById('isuser').value = "GROUP"
    document.getElementById('tmpuser').value = e;
    return false;
}