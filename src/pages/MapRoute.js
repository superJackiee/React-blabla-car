import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../actions/tutorials";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from '../components/Map.js';

const MapRoute = (props) => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const mediaMatch = window.matchMedia('(min-width: 768px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const tutorials = useSelector(state => state.tutorials);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(retrieveTutorials());
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const btnContinueHandler = () => {
    props.history.push("/boost");
  };

  const findByTitle = () => {
    refreshData();
    // dispatch(findTutorialsByTitle(searchTitle));
  };

  return (
    <div className="list row mw-100">
      <div className="col-md-6 d-flex">
        <div className="text-center" style={styles.leftContainer(matches)}
        >
          <h5 className={""} style={styles.txtTitle(matches)}>Pick-up</h5>

          <div className="input-group " style={{marginBottom: matches ? "1vw" : "2vw"}}>
            {/* <input
              id="origin-input"
              className="controls form-control"
              type="text"
              placeholder="Enter an origin location"
              style={styles.inputSearch(matches)} /> */}
            <select id="start" className="form-control" style={styles.inputSearch(matches)}>
              {/* <option value="chicago, il">Chicago</option>
              <option value="st louis, mo">St Louis</option>
              <option value="joplin, mo">Joplin, MO</option>
              <option value="oklahoma city, ok">Oklahoma City</option>
              <option value="amarillo, tx">Amarillo</option>
              <option value="gallup, nm">Gallup, NM</option>
              <option value="flagstaff, az">Flagstaff, AZ</option>
              <option value="winona, az">Winona</option>
              <option value="kingman, az">Kingman</option>
              <option value="barstow, ca">Barstow</option>
              <option value="san bernardino, ca">San Bernardino</option>
              <option value="los angeles, ca">Los Angeles</option> */}
              <option value="ChIJ2V-Mo_l1nkcRfZixfUq4DAE">Munich, Germany</option>
              <option value="ChIJGaK-SZcLkEcRA9wf5_GNbuY">Zürich, Switzerland</option>
              <option value="ChIJgWsCh7C4VTcRwgRZ3btjpY8">Dhaka, Bangladesh</option>
              <option value="ChIJGYvdV064VTcR6CHngkEpb9Y">Dhaka New Market, Mirpur Road, Dhaka, Bangladesh</option>
              <option value="ChIJPWFe8sG4VTcR__h4xe5i1ao">Dhaka University, Dhaka, Bangladesh</option>
              <option value="ChIJz4dBR-a4VTcRIpVlVTd407M">Dhaka Medical College Hospital, Secretariat Road, Dhaka, Bangladesh</option>
            </select>

            <span className="material-icons" style={styles.icSearch(matches)}>
            search
            </span>

          </div>

          <h5 className="" style={styles.txtTitle(matches)}>Drop-off</h5>

          <div className="input-group ">
            <select id="end" className="form-control" style={styles.inputSearch(matches)}>
              {/* <option value="chicago, il">Chicago</option>
              <option value="st louis, mo">St Louis</option>
              <option value="joplin, mo">Joplin, MO</option>
              <option value="oklahoma city, ok">Oklahoma City</option>
              <option value="amarillo, tx">Amarillo</option>
              <option value="gallup, nm">Gallup, NM</option>
              <option value="flagstaff, az">Flagstaff, AZ</option>
              <option value="winona, az">Winona</option>
              <option value="kingman, az">Kingman</option>
              <option value="barstow, ca">Barstow</option>
              <option value="san bernardino, ca">San Bernardino</option>
              <option value="los angeles, ca">Los Angeles</option> */}
              <option value="ChIJ2V-Mo_l1nkcRfZixfUq4DAE">Munich, Germany</option>
              <option value="ChIJGaK-SZcLkEcRA9wf5_GNbuY">Zürich, Switzerland</option>
              <option value="ChIJgWsCh7C4VTcRwgRZ3btjpY8">Dhaka, Bangladesh</option>
              <option value="ChIJGYvdV064VTcR6CHngkEpb9Y">Dhaka New Market, Mirpur Road, Dhaka, Bangladesh</option>
              <option value="ChIJPWFe8sG4VTcR__h4xe5i1ao">Dhaka University, Dhaka, Bangladesh</option>
              <option value="ChIJz4dBR-a4VTcRIpVlVTd407M">Dhaka Medical College Hospital, Secretariat Road, Dhaka, Bangladesh</option>
            </select>
            {/* <input
              id="destination-input"
              className="controls form-control"
              type="text"
              placeholder="Enter a destination location"
              style={styles.inputSearch(matches)}
            /> */}

            <span className="material-icons" style={styles.icSearch(matches)}>search</span>
          </div>

          <div className="" style={styles.hDivider} />

          <h5 className="" style={styles.txtTitle(matches)}>Whats your route?</h5>

          <ul id="route-selector" className="list-group" style={styles.lstContainer}>
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                  style={styles.lstRoutes(matches)}
                >
                  {tutorial.title}
                  <input type="radio" style={styles.btnRadio(matches)} onChange={() => {}} />
                </li>
              ))}
          </ul>

          <button
            className="btn btn-sm"
            style={styles.btnContinue(matches)}
            onClick={btnContinueHandler}
          >
            Continue
          </button>
        </div>
      </div>
      
      <div className="col-md-6 p-0">
        <Map />
      </div>
    </div>
  );
};

const styles = {
  leftContainer: isRowBased => ({ 
    border: "1px solid #707070", 
    padding: "7%",
    width: isRowBased ? "35vw" : "70vw",
    height: isRowBased ? "70vh" : "75vh",
    margin: isRowBased ? "auto" : "10vh auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: "3vw"}),
  icSearch: isRowBased => ({ 
    fontSize: isRowBased ? "1vw" : "2vw",
    color: "#707070",
    position: "absolute",
    zIndex: 100,
    top: "50%",
    left: "7%",
    transform: `translate(-50%, -50%)` 
  }),
  inputSearch: isRowBased => ({
    backgroundColor: "#F2F2F2",
    border: "none",
    height: "4vh",
    fontSize: isRowBased ? "1vw" : "2vw",
    padding: 0,
    borderRadius: "2em",
    paddingLeft: "3em",
  }),
  hDivider: {
    width: "100%",
    border: "1px solid #F2F2F2",
    margin: "3vh auto",
    height: "1px",
  },
  lstContainer: {
    marginBottom: "3em",
  },
  lstRoutes: isRowBased => ({
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: isRowBased ? '1vw' : "2vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    alignSelf: "center",
    height: "4em",
    width: "80%",
  }),
  btnRadio: isRowBased => ({
    minWidth: isRowBased ? "2vw" : "4vw",
    minHeight: isRowBased ? "2vw" : "4vw",
    width: isRowBased ? "2vw" : "4vw",
    height: isRowBased ? "2vw" : "4vw",
    backgroundColor: "#00AEEF",
  }),
  btnContinue: isRowBased => ({
    height: "4vh",
    width: "100%",
    borderRadius: "2em",
    color: "#FFFFFF",
    backgroundColor: "#00AEEF",
    fontFamily: "Poppins",
    fontSize: "1em",
  }),
  txtTitle: isRowBased => ({
    fontFamily: "Montserrat",
    fontSize: isRowBased ? "2vw" : "4vw",
    fontWeight: "650",
    letterSpacing: "-0.33px"
  }),
}

export default MapRoute;