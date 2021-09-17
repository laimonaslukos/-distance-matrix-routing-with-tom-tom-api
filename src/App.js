import { useEffect, useState, useRef } from "react";
import "./App.css";
import * as tt from '@tomtom-international/web-sdk-maps'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(25.2798)
  const [latitude, setLatitude] = useState(54.68916)


useEffect(()=> {
  let map = tt.map({
    key: process.env.REACT_APP_TOM_TOM_API_KEY,
    container: mapElement.current,
    stylesVisibility: {
      trafficIncidents: true,
      trafficFlow: true,
    },
    center: [longitude, latitude],
    zoom: 14,
  })
setMap(map);

const addMaker = () => {
  const element = document.createElement('div')
  element.className = 'marker'

  const marker = new tt.Marker({
    draggable:true,
    element: element,
  })

.setLngLat([longitude, latitude])
.addTo(map)

}

addMaker()
return ()=> map.remove()

}, [longitude, latitude])


  return (
  <>
  {map && <div className="app">
    <div ref={mapElement} className="map"/>
    <div className="search-bar">
      <h1>Where to?</h1>
      <input type="text" id="longitude" placeholder="Put in Longitude" onChange={(e)=> { setLongitude(e.target.value)}} />
      <input type="text" id="latitude" placeholder="Put in Latitude" onChange={(e)=> { setLatitude(e.target.value)}} />
    </div>
  </div>}
  </>
  )
}

export default App;
