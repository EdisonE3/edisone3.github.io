function onClickAddMovie() {
    let title = document.querySelector('form input[name="movieTitle"]').value;
    let date = document.querySelector('form input[name="movieDate"]').value;
    let time = document.querySelector('form input[name="movieTime"]').value;
    let duration = document.querySelector('form input[name="duration"]').value;
    let price = document.querySelector('form input[name="price"]').value;
    let movieHall = document.getElementById("movieHall").value;
    var checkradio = document.getElementsByName("movieType");
    var selectType = "null";
    for (var i = 0; i < checkradio.length; i++) {
        if (checkradio[i].checked) {
            selectType = checkradio[i].value;
        }
    }


    if (validateInput(title, date, time, duration, price, movieHall, selectType)) {
        addRow();
        alert("success!");
    }

    closeLayer();
}

function validateInput(title, date, time, duration, price, movieHall, selectType) {
    if (!(title && date && time && duration && price && movieHall && selectType)) {
        alert("Error 165: Some value is empty");
        return false;
    }

    if (isNaN(Number(duration)) || Number(duration) < 30 || Number(duration) > 300) {
        alert("Error 443: Duration shuold be in [30, 300]")
        return false;
    }

    if (isNaN(parseFloat(price))) {
        alert("Error 431: Price shuold be number");
        return false;
    }

    var movieListRow = document.getElementById("movieList").rows;
    for (let i = 2; i < movieListRow.length; i++) {
        if (movieListRow[i].cells[0].innerHTML == title && movieListRow[i].cells[4].innerHTML == movieHall && movieListRow[i].cells[6].innerHTML != selectType) {
            alert("Error 621: Type can't be same");
            return false;
        }

    }

    return true;
}

function initial() {
    let movieHall = document.getElementById("movieHall");
    for (let i = 1; i <= 7; i++) {
        movieHall.options.add(new Option(i, i));
    }
}

function convertToISO(timebit) {
    // remove GMT offset
    timebit.setHours(0, -timebit.getTimezoneOffset(), 0, 0);
    // format convert and take first 10 characters of result
    var isodate = timebit.toISOString().slice(0, 10);
    return isodate;
}

function addRow() {
    let bodyObj = document.getElementById("tbody");
    if (!bodyObj) {
        alert("Body of Table not Exist!");
        return;
    }

    let title = document.querySelector('form input[name="movieTitle"]').value;
    let date = document.querySelector('form input[name="movieDate"]').value;
    let time = document.querySelector('form input[name="movieTime"]').value;
    let duration = document.querySelector('form input[name="duration"]').value;
    let price = document.querySelector('form input[name="price"]').value;
    let movieHall = document.getElementById("movieHall").value;
    var checkradio = document.getElementsByName("movieType");
    var selectType = "null";
    for (var i = 0; i < checkradio.length; i++) {
        if (checkradio[i].checked) {
            selectType = checkradio[i].value;
        }
    }

    let rowCount = bodyObj.rows.length;
    let cellCount = bodyObj.rows[0].cells.length;
    bodyObj.style.display = ""; // display the tbody
    let newRow = bodyObj.insertRow(rowCount++);
    newRow.insertCell(0).innerHTML = title;
    newRow.insertCell(1).innerHTML = date;
    newRow.insertCell(2).innerHTML = time;
    newRow.insertCell(3).innerHTML = duration;
    newRow.insertCell(4).innerHTML = movieHall;
    newRow.insertCell(5).innerHTML = parseFloat(price).toFixed(1);
    newRow.insertCell(6).innerHTML = selectType;
    newRow.insertCell(7).innerHTML = bodyObj.rows[0].cells[cellCount -
        1].innerHTML; // copy the "delete" button
    bodyObj.rows[0].style.display = "none"; // hide first row
}

function removeRow(inputobj) {
    if (!inputobj) return;
    let parentTD = inputobj.parentNode;
    let parentTR = parentTD.parentNode;
    let parentTBODY = parentTR.parentNode;
    parentTBODY.removeChild(parentTR);
}

function popLayer() {
    var popLayer = document.getElementById('popLayer');


    popLayer.style.width = "100%";
    popLayer.style.height = "100%";
    popLayer.style.display = "block";
}

function closeLayer() {
    var popLayer = document.getElementById('popLayer');
    popLayer.style.display = "none";

    document.querySelector('form input[name="movieTitle"]').value = "";
    document.querySelector('form input[name="duration"]').value = "";
    document.querySelector('form input[name="price"]').value = "";
}