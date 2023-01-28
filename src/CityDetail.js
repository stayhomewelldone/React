import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const URI_COLLECTION = "http://145.24.222.51:8000/cities/"


export function CityDetail(){

    const params = useParams()
    const [detail, setDetail] = useState([])


    const loadJson = () => {
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
    useEffect(() => {
        loadJson();
    });

    return <div className="Detail">
        <p>id: {params.id}</p>
        {detail && <p>city: {detail.city}</p>}
        {detail && <p>population: {detail.population}</p>}
        {detail && <p>country: {detail.country}</p>}
        {detail && <p>skyscrapers: {detail.skyscrapers}</p>}
        <p><Link to={`/cities/edit/${params.id}`} >Update city</Link></p>


    </div>
}