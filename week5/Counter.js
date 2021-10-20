import React, {useState, useEffect} from "react";
import firebase from "../firebase.js";
import '../Counter.css';
import M from "materialize-css";

const Counter = () => {

const FERRY_MAXIMUM_CAPACITY = 222; // TODO: Business data, keep in centralized file OR make it an editable app setting for admins

    const [count, setCount] = useState(0);      // the number of passengers counted

    useEffect(() => {}, [])

    // Tells us if maximum capacity has been reached
    const capacityCheck = () => {
        return(count >= FERRY_MAXIMUM_CAPACITY)
    }

    // Increases the count by 1
    const increase = () => {
        setCount(count => count + 1);
    }

    // Decreases the count by 1
    const decrease = () => {
        if (count > 0) {
            setCount(count => count - 1);
        }
    }

    // Resets the count to 0
    const clear = () => {
        setCount(0);
    }

    // Processes the count prior to logging
    const process = () => {
        if (capacityCheck()) {
            M.toast({html: "Maximum capacity has been reached !!!"})
            // TODO: Warn user & ask for validation before logging
        }
        log();
    }

    // Adds a document to the firestore using data from the component state
    const log = () => {
        firebase.firestore().collection("Counts").add({
            created: new Date(), // date and time the passengers were counted
            passengers: count,
            // trip:
        })
        .then(M.toast({html: "Succesfully saved passenger count !"}), clear())   // Show success message on success and clear count
        .catch((error) => M.toast({html: error}));                               // Show error message on failure
    }

    return (
        <div className="container center-align">
            <div className="row">
                <span id="display-count">{count}</span>
            </div>
            <div className="row">
                <div className="col s12"><button id="increase-count" className="waves-light btn-large orange darken-3" onClick={increase}><i className="material-icons left">person_add</i>add</button></div>
            </div>
            <div className="row">
                <div className="col s6"><button id="clear-count" className="waves-light btn red" onClick={clear}><i className="material-icons left">person_off</i>clear</button></div>
                <div className="col s6"><button id="decrease-count" className="waves-light btn red" onClick={decrease}><i className="material-icons left">person_remove</i>remove</button></div>
            </div>
            <div className="row">
                <div className="col s12"><button id="save-count" className="waves-light btn-large light-blue accent-3" onClick={process}><i className="material-icons left">send</i>save</button></div>
            </div>
        </div>
    );
}

export default Counter;