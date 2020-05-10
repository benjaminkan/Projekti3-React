import React from "react";
import ReactDOM from "react-dom";


const GetTeams = () => {


  // Määritellään käsittelijä napille 
  const handleClick = (event) => {
    event.preventDefault();
    console.log("Tapahtuman aiheutti: ", event.target);
    GetTeamData();
  };
  // Komponentin palauttama JSX muotoinen esitys
  return (
    <div>
      <h1>National Football Teams</h1>
      <br></br>
      <h6>This list contains national teams that competed in the FIFA World Cup 2018.</h6>
      <br></br>
      <div class="center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Show all teams
              </button>
      </div>
      <br></br>
    </div>
  );
};
ReactDOM.render(<GetTeams />, document.getElementById("root"));

const TeamArray = (props) => {
  const { data } = props;
  var flagImg;

  const CheckFlag = (props) => {
    var flag = props.src;
    // Jos kuvaa ei ole määritelty, korvataan se ikonilla
    if (flag === "" || flag === null) {
      flagImg = "https://via.placeholder.com/150";
    } else {
      flagImg = flag;
    }
    // Palautetaan kuvatägi. onError suoritetaan jos kuvan lataus ei onnistu
    return (
      <img
        src={flagImg}
        className="img-thumbnail"
        alt="flag"
        onError={addDefaultSrc}
        width="10%"
      />
    );
  };

  //Yritetään asettaa rikkinäiseen kuvaan tyhjä ikoni tai edes poistaa src-tägistä kokonaan
  const addDefaultSrc = (ev) => {
    console.log(ev.target);
    ev.target.src = "https://via.placeholder.com/150";
    ev.onError = null;
  };

  return (
    <div>
      <GetTeams />
      <table className="table table-striped table-bordered">
        <thead>
          <tr key={props.id}>
            <th scope="col">Name</th>
            <th scope="col">fifaCode</th>
            <th scope="col">Flag</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr>
              <td key={i}> {item.name}</td>
              <td> {item.fifaCode} </td>
              <td id="pic">
                <CheckFlag src={item.flag} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

const GetTeamData = () => {
  fetch("https://api.jsonbin.io/b/5eb7e9bb47a2266b14760321")
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log(data);
      const items = data;

      ReactDOM.render(
        <TeamArray data={items} />,
        document.getElementById("root")
      );
    });
  return <div>Nothing here. Fetching data...</div>
};
