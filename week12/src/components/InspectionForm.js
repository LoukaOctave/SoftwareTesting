import React, {useState, useEffect} from "react";
import firebase from "../firebase.js";
import InspectionsList from "./InspectionsList.js";
import M from "materialize-css";

const InspectionForm = () => {
    
    const [name, setName] = useState("");               // the name of the person reporting
    const [status, setStatus] = useState(false);        // the status of the machine (OK/Not OK)
    const [description, setDescription] = useState(""); // an additional description for the inspection report

    useEffect(() => {}, [])

    // Checks the form for empty mandatory fields
    const checkForm = () => {
        let check = true;
        if (name === "") { 
            check = false;
            M.toast({html: "Please fill in a name."});
        }
        return check;
    }

    // Clears the form and resets the state
    const clear = () => {
        document.getElementById('inspection-form').reset();
        setName("");
        setStatus(false);
        setDescription("");
    }

    // Warns the user when they report an inspection with negative results
    const warn = () => {
        if (!status) { M.toast({html: "Status not OK. Report negative inspection results to IT support!"}); }
    }

    // Adds a document to the firestore using data from the component state
    const report = () => {
        if (checkForm()) {                                              // Check the form
            warn();                                                     // Warn the user
            firebase.firestore().collection("Inspections").add({        // Add the document
                inspectedOn: new Date(),    // date and time of the report
                inspectedBy: name,
                status: status,
                description: description
            })
            .then(M.toast({html: "Succesfully saved inspection report !"}), clear())    // Show success message on success and clear form
            .catch((error) => M.toast({html: error}));                                  // Show error message on failure
        }
    }

    return (
        <div>
            <div className="container">
                <h1 className="row">Inspections</h1>
                <form id="inspection-form">
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="name" id="name" type="text" className="validate" value={name} onChange={(e) => setName(e.target.value)}/>
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <p>
                            <label htmlFor="status">
                                <input name="status" id="status" type="checkbox" value={status} onChange={(e) => setStatus(e.target.checked)}/>
                                <span>All OK?</span>
                            </label>
                        </p>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea name="description" id="description" className="materialize-textarea" value={description} onChange={(e) => setDescription(e.target.value)}/>
                            <label htmlFor="description">Description (optional)</label>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <button className="waves-light btn-large light-blue accent-3" onClick={report}><i className="material-icons left">send</i>Save</button>
                </div>
            </div>
            <InspectionsList />
        </div>
    );
}

export default InspectionForm;