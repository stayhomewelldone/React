import {Profiler, useEffect, useState} from "react";
import React from 'react';
import {City} from "./City";
import {NewCity} from "./NewCity";
import "./style.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./Layout";
import {Error} from "./Error";
import {CityDetail} from "./CityDetail";
import {CityUpdate} from "./CityUpdate";
import {StrictMode} from "react";


const callback = (id, phase, actualDuration, startTime,
                  baseDuration, commitTime, interactions) => {
    console.log(
        "id " + id +
        " startTime " + startTime +
        " actualDuration " + actualDuration +
        " baseDuration " + baseDuration +
        " commitTime " + commitTime +
        " phase " + phase +
        " interactions " + interactions
    );
}

export function App() {
    const [start, setStart] = useState(1)
    const URI_COLLECTION = `http://145.24.222.51:8000/cities/?start=${start}&limit=5`

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const loadJson =  () => {
        setIsLoading(true);
        const response =  fetch(URI_COLLECTION, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => setCities(data.items))
            .catch((error) => console.error(error))
            setIsLoading(false)
    };

    useEffect(() => {
        loadJson();
    }, [start]);

    const showCities =cities ?  cities.map((value, key) =>
        <City key={value.id} id={value.id} city={value} name="Tessa"  citiesRefreshHandler={loadJson}/>)
        : <p>No cities to show</p>
    return (
        <React.Fragment>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={showCities}/>
                <Route path="create" element={<Profiler id="test" onRender={callback}><NewCity name="New City"citiesRefreshHandler={loadJson}/></Profiler>}/>
                <Route path="cities/:id" element={<CityDetail/>}/>
                <Route path="cities/edit/:id" element={<CityUpdate  citiesRefreshHandler={loadJson}/>}/>
                <Route path="*" element={<Error/>}/>
            </Route>

        </Routes>
    </BrowserRouter>

        <button onClick={() => setStart(start+5)}>next</button>
        {start<= 5? <p></p> :<button onClick={() => setStart(start-5)}>previous</button>}

        </React.Fragment>);

}

