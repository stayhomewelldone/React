import {useState} from "react";
const URI_COLLECTION = "http://145.24.222.51:8000/cities/"
import React from 'react';
import PropTypes from 'prop-types'
export function NewCity(props) {
    const [city, setCity] = useState({
        city: "",
        population: "",
        country: "",
        skyscrapers: ""
    });
    const [isSaving, setIsSaving] = useState(false);


    const saveCity = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        try {
            await fetch(URI_COLLECTION, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(city)

            });
            setCity({
                city: "",
                population: "",
                country: "",
                skyscrapers: ""
            });
            props.citiesRefreshHandler();
        } catch (error) {
            console.error(error);
        }
        setIsSaving(false);
        alert("Your city is being uploaded!")
    }



    const onChangeHandler = (event) => {
        setCity({
            ...city,
            [event.target.name]: event.target.value
        });
    }
    return (
        <React.Fragment>
            <h2>{props.name}</h2>


            <form>
                <input type="text" placeholder="city" value={city.city} name="city" onChange={onChangeHandler}/>
                <input type="text" placeholder="population" value={city.population} name="population" onChange={onChangeHandler}/>
                <input type="text" placeholder="country" value={city.country} name="country" onChange={onChangeHandler}/>
                <input type="text" placeholder="skyscrapers" value={city.skyscrapers} name="skyscrapers" onChange={onChangeHandler}/>
                <button onClick={saveCity}  disabled={isSaving}>
                    {isSaving ? "Saving..." : "SAVE"}
                </button>
            </form>
        </React.Fragment>
    );
}

NewCity.propTypes = {
    name: PropTypes.string,
    citiesRefreshHandler: PropTypes.func
}

