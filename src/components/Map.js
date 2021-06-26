import { functions, isEqual, omit } from 'lodash'
import React, { useState, useEffect, useRef } from 'react'
import { googleAPIKey } from '../http-common'
import $ from 'jquery';

function Map({ options, onMount, className, onMountProps }) {
  const ref = useRef()
  const [map, setMap] = useState()
  const mediaMatch = window.matchMedia('(min-width: 768px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // const selectedMode = document.getElementById("mode").value;
    directionsService.route(
      {
        origin: { 
            placeId: document.getElementById("start").value,
        },
        destination: { 
            placeId: document.getElementById("end").value,
         },
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives : true,
      },
      (response, status) => {
        if (status == "OK") {
            console.log(response);
            directionsRenderer.setDirections(response);
            if (response.routes.length > 0) {
                $("#route-selector").html('');
            }
            for (var i = 0, len = response.routes.length; i < len; i++) {
                const newLi = $('<li data-index='+i+'>'+ response.routes[i].summary +
                    ' <input name="route" type="radio" '+ (!i ? 'checked': '') + '/></li>');
                newLi.addClass("list-group-item");
                newLi.attr('key', i);
                newLi.css(styles.lstRoutes(matches));
                if (!i) {
                    newLi.addClass("active");
                }
                newLi.find('input').css(styles.btnRadio(matches));

                $("#route-selector").append(newLi);
                // console.log(response.routes[i].summary);
            }
            // document.getElementById("route-selector").innerHTML = newHtml;
            $('body').on('click', '.list-group-item', function() {
                var idx = $(this).data('index');
                $('.list-group-item').removeClass('active');
                $('input[type=radio]').attr("checked", false);
                $(this).addClass('active');
                $(this).find('input').first().attr("checked", true);
                directionsRenderer.setRouteIndex(idx);
                // alert(idx);
            })
            
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  useEffect(() => {
    // The Google Maps API modifies the options object passed to
    // the Map constructor in place by adding a mapTypeId with default
    // value 'roadmap'. { ...options } prevents this by creating a copy.
    const onLoad = () => {
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        const directionsService = new window.google.maps.DirectionsService();
        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 },
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });
        directionsRenderer.setMap(map);
        setMap(map);

        const onChangeHandler = function () {
          calculateAndDisplayRoute(directionsService, directionsRenderer);
        };
        document.getElementById("start").addEventListener("change", onChangeHandler);
        document.getElementById("end").addEventListener("change", onChangeHandler);
        // document.getElementById("mode").addEventListener("change", () => {
        //     calculateAndDisplayRoute(directionsService, directionsRenderer);
        // });
        // setMap(new window.google.maps.Map(ref.current, { ...options }))
    }
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        googleAPIKey
        //+ '&callback=initAutocomplete&libraries=places&v=weekly'
        // process.env.GOOGLE_MAPS_API_KEY
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [options])

  if (map && typeof onMount === `function`) onMount(map, onMountProps)

  return (
    <div id="map"
      style={styles.mapDiv(matches)}
      {...{ ref, className }}
    />
  )
}

function shouldNotUpdate(props, nextProps) {
  const [funcs, nextFuncs] = [functions(props), functions(nextProps)]
  const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs))
  const noFuncChange =
    funcs.length === nextFuncs.length &&
    funcs.every(fn => props[fn].toString() === nextProps[fn].toString())
  return noPropChange && noFuncChange
}

const styles = {
  mapDiv: isRowBased => ({
    height: isRowBased ? `96vh` : '100vh',
    margin: `0`,
  }),
  lstRoutes: isRowBased => ({
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: isRowBased ? '1vw' : "2vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    color: "black",
    height: "4em",
    width: "80%",
    textAlign: "left",
  }),
  btnRadio: isRowBased => ({
    minWidth: isRowBased ? "2vw" : "4vw",
    minHeight: isRowBased ? "2vw" : "4vw",
    width: isRowBased ? "2vw" : "4vw",
    height: isRowBased ? "2vw" : "4vw",
    backgroundColor: "#00AEEF",
  }),
}

export default React.memo(Map, shouldNotUpdate)

Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  },

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}