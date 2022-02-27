const allPlayers = () => {
  document.getElementById("details-container").innerHTML = "";
  document.getElementById("player-container").innerHTML = "";
  document.getElementById("male").style.display = "none";
  document.getElementById("female").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  const searchElement = document.getElementById("search-box");
  const searchValue = searchElement.value;
  searchElement.value = "";
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPlayerDetails(data.player));
};

const showPlayerDetails = (players) => {
  if (players) {
    document.getElementById("spinner").style.display = "none";
  } else {
    document.getElementById("spinner").style.display = "block";
  }
  const parent = document.getElementById("player-container");
  //   console.log(player);
  players.forEach((player) => {
    console.log(player);
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card border shadow-lg p-4 my-2 bg-secondary bg-gradient text-white">
          <div class="pro-pic">
              <img class="w-75 image-fluid" src="${player.strThumb}" alt="">
          </div>
          <h3>Name: ${player.strPlayer}</h3>
          <h5>Country: ${player.strNationality} </h5>
          <p>Info: ${player.strDescriptionEN.slice(0, 120)}</p>
          <div class="allbutton">
              <button class="delete-btn btn btn-danger">Delete</button>
              <button onclick="details('${
                player.idPlayer
              }')" class="btn btn-warning">Details</button>
          </div>
      </div>
    `;
    parent.appendChild(div);
    const allDeleteBtn = document.getElementsByClassName("delete-btn");
    for (const button of allDeleteBtn) {
      button.addEventListener("click", function (e) {
        e.target.parentNode.parentNode.style.display = "none";
        document.getElementById("details-container").style.display = "none";
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "none";
      });
    }
  });
};

const details = (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => setDetails(data.players[0]));
};

const setDetails = (info) => {
  console.log(info);
  if (info.strGender == "Male") {
    document.getElementById("male").style.display = "block";
    document.getElementById("female").style.display = "none";
  } else {
    document.getElementById("male").style.display = "none";
    document.getElementById("female").style.display = "block";
  }
  document.getElementById("details-container").style.display = "block";

  document.getElementById("details-container").innerHTML = `
            <div class="card border shadow-lg p-4 my-4 bg-secondary bg-gradient text-white">
            <div class="pro-pic">
                <img class="w-75 image-fluid " src="${info.strThumb}" alt="">
            </div>
            <h3>Name: ${info.strPlayer}</h3>
            <h5>Country: ${info.strNationality} </h5>
            <h6>BirthDate: ${info.dateBorn} </h6>
            <h6>BirthLocation: ${info.strBirthLocation} </h6>
            <h6>BirthLocation: ${info.strBirthLocation} </h6>
            <h6>ClubTeam: ${info.strTeam} </h6>
            <h6>Jersey Number: ${info.strNumber} </h6>
            <p>Info: ${info.strDescriptionEN.slice(0, 800)}</p>

            </div>
  `;
};
