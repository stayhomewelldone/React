import {useState} from "react";
import "./style.css";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {NewCity} from "./NewCity";
export function City(props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [likes, setLikes] = useState(0);

    const addLike = () => {
        setLikes((value) => (value + 1)
        )}
const deleteCity = async () => {
    setIsDeleting(true);
    try {
        await fetch(props.city._links.self.href, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json'
            }
        });
        props.citiesRefreshHandler();
    } catch (error) {
        console.error(error);
    }
    alert(`Deleted city: ${props.city.city}`);
    setIsDeleting(false);
}

return (
    <section className="City">
        <h2>{props.city.city}</h2>
        <p><Link to={"cities/" + props.city.id}>Details city</Link></p>
        <p><Link to={"cities/edit/" + props.city.id}>Update city</Link></p>
        {props.city.population > 400000 ? <p> A big city </p> : <p> A small city </p>}
        <p>Likes: {likes}</p>

        <button onClick={deleteCity} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "DELETE"}
        </button>
        <button onClick={addLike}>Like</button>

    </section>

);
}
City.propTypes = {
    id: PropTypes.number,
    city: PropTypes.string
}

