import {useEffect, useState} from "react";
import "./style.css";
import {useParams, RedirectFunction, Link} from "react-router-dom";

const URI_COLLECTION = "http://145.24.222.51:8000/cities/"


export function CityUpdate(props) {
    const params = useParams()

    const [isSaving, setIsSaving] = useState(false);

    const [city, setCity] = useState({
        city: "",
        population: "",
        country: "",
        skyscrapers: ""
    });
    const UpdateCity = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        try {
            await fetch(URI_COLLECTION + params.id , {
                method: 'PUT',
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
        alert("Your city is being updated!")
        setIsSaving(false);

    }
    const [detail, setDetail] = useState([])

    const getDetail = () => {
        fetch(URI_COLLECTION + params.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setDetail(data))
            .catch(error => console.error(error))
    }
    const onChangeHandler = (event) => {
        setCity({
            ...city,
            [event.target.name]: event.target.value
        });
    }
    useEffect(() => {
        getDetail();
    });
    return (
        <>
            <p><Link to={`/cities/${params.id}`} >Go to city</Link></p>

            <form onSubmit={UpdateCity}>
            <input type="text" placeholder={detail.city} value={city.city} name="city" onChange={onChangeHandler}/>
            <input type="text" placeholder={detail.population} value={city.population} name="population" onChange={onChangeHandler}/>
            <input type="text" placeholder={detail.country} value={city.country} name="country" onChange={onChangeHandler}/>
            <input type="text" placeholder={detail.skyscrapers} value={city.skyscrapers} name="skyscrapers" onChange={onChangeHandler}/>
            <button onClick={UpdateCity}  disabled={isSaving}>
                {isSaving ? "Saving..." : "SAVE"}
            </button>
        </form>
        </>
    );
}




