import React, { useEffect, useState } from "react";
import LinksForm from "./LinksForm";

import { db } from "../firebase";
import { toast } from "react-toastify";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getLinks = async () => {
    db.collection("tareas").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await db.collection("tareas").doc(id).delete();
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("tareas").doc().set(linkObject);
        toast("New Link Added", {
          type: "success",
        });
      } else {
        await db.collection("tareas").doc(currentId).update(linkObject);
        toast("Link Updated Successfully", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>          
      <div className="col-md-4 p-2">        
        <h2 className="text-center pb-5 m-auto ">Crud de tareas</h2>
        <LinksForm {...{ addOrEditLink, currentId, links }} />        
      </div>      
      <div className="col-md-8 p-2">
        {links.map((link,i) => (   
          <div className="card mb-1" key={link.id}>
            {i === 0 ? 
            <div className="card-body displayEncabezado">
              <h5>Tarea</h5>
              <h5>Descripción </h5>
              <h5>Latitud</h5>
              <h5>Longitud</h5>
            </div>                           
            :""}

            <div className="card-body displayListado">                          
              <h5>{link.name}</h5>                            
              <p className="borderP">{link.description}</p>
              <p>{link.latitud}</p>
              <p>{link.longitud}</p>

              <i
                className="material-icons text-danger"
                onClick={() => onDeleteLink(link.id)}
              >
                close
              </i>
              <i
                className="material-icons"
                onClick={() => setCurrentId(link.id)}
              >
                create
              </i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Links;
