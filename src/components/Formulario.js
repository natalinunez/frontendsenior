import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinksForm = (props) => {
  const initialStateValues = {
    comments: "",
    phone: "",
    email: "",
    lastname: "",
    name: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.addOrEditLink(values);
    addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  // ini naty
  const addOrEditLink = async (linkObject) => {
    try {
      // if (currentId === "") {
        await db.collection("formulario").doc().set(linkObject);
        toast("New Link Added", {
          type: "success",
        });
      // } else {
        // await db.collection("formulario").doc(currentId).update(linkObject);
        // toast("Link Updated Successfully", {
        //   type: "info",
        // });
        // setCurrentId("");
      // }
    } catch (error) {
      console.error(error);
    }
  };
// fin naty

  const getLinkById = async (id) => {
    const doc = await db.collection("formulario").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      // getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (    
    <>
    <h2 className="text-center pb-5 m-auto ">Formulario de contacto</h2>
      <form onSubmit={handleSubmit} className="card card-body border-primary">            
        {/* <div className="form-group input-group card-block"> */}
          <div className="form-group input-group displayListado" >      
            <h5>Nombres</h5>        
            <input
              type="text"
              value={values.name}
              name="name"          
              className="medida-entrada1"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group input-group displayListado">        
            <h5>Apellidos</h5>        
            <input
              type="text"
              className="medida-entrada1"
              value={values.lastname}
              name="lastname"
              onChange={handleInputChange}
            />
          </div>            
        {/* </div> */}

        {/* <div className="form-group input-group card-block"> */}
          <div className="form-group input-group displayListado">                
            <h5>Correo Electrónico</h5>        
            <input
              type="email"
              className="medida-entrada1"
              value={values.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>   
          <div className="form-group input-group displayListado">                
            <h5>Teléfono Fijo/Movil</h5>        
            <input
              type="number"
              className="medida-entrada1"
              value={values.phone}
              name="phone"
              onChange={handleInputChange}
            />
          </div>   
        {/* </div>   */}

        <div className="form-group input-group ">        
          <h5>Comentarios</h5>
          <textarea
            rows="7"
            className="medida-entrada2"          
            name="comments"
            value={values.comments}
            onChange={handleInputChange}
          ></textarea>        
        </div>            
        <button className="btn btn-primary button">
          Enviar datos
        </button>
      </form>
    </>
  );
};

export default LinksForm;
    