import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinksForm = (props) => {
  const initialStateValues = {
    longitud: "", 
    latitud: "",    
    description: "",
    name: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // const validURL = (str) => {
  //   var pattern = new RegExp(
  //     "^(https?:\\/\\/)?" + // protocol
  //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
  //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  //       "(\\#[-a-z\\d_]*)?$",
  //     "i"
  //   ); // fragment locator
  //   return !!pattern.test(str);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!validURL(values.latitud)) {
    //   return toast("invalid latitud", { type: "warning", autoClose: 1000 });
    // }

    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("tareas").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <>
      
      <form onSubmit={handleSubmit} className="card card-body border-primary">
      {/* <form  className="card card-body border-primary"> */}
        <div className="form-group input-group " >      
          {/* <i className="material-icons">create</i> */}
          <h5>Nombre de la tarea</h5>        
          <input
            type="text"
            value={values.name}
            name="name"
            // placeholder="Nombre de la tarea"
            className="medida-entrada2"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group input-group ">
          {/* <i className="material-icons">create</i> */}
          <h5>Descripción de la tarea</h5>
          <textarea
            rows="3"
            className="medida-entrada2"
            // placeholder="Write a Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>        
        </div>

        <div className="form-group input-group">        
          {/* <i className="material-icons">insert_link</i> */}
          <h5>Latitud</h5>        
          <input
            type="text"
            className="medida-entrada2"
            // placeholder="https://someurl.xyz"          
            //placeholder="Ejemplo 40.7"
            value={values.latitud}
            name="latitud"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group input-group">        
          {/* <i className="material-icons">insert_link</i> */}
          <h5>Longitud</h5>        
          <input
            type="text"
            className="medida-entrada2"
            // placeholder="https://someurl.xyz"          
            //placeholder="Ejemplo 40.7"
            value={values.longitud}
            name="longitud"
            onChange={handleInputChange}
          />
        </div>      

        <button className="btn btn-primary btn-block">
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </>
  );
};

export default LinksForm;
