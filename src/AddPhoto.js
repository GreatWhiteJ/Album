import React, { useState, useEffect } from "react";
import { Dialog, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db, storage } from "./firebase";
import {uuid} from 'node-uuid';
export default function AddPhoto(props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const handleSavePhoto = () => {
     storage.ref("photos/"+uuid()).put(file).then((snapshot)=>{
      snapshot.ref.getDownloadURL().then((downloadURL)=> {
        db.collection("users")
        .doc(props.user.uid)
        .collection("albums")
        .doc(props.album_id)
        .collection("photos")
        .add({ title: title, image: downloadURL })
        .then(()=>{
          setTitle("");
          setFile(null);
          props.onClose();
          console.log("its working")

        })
      })
    })
  };

 
 
  const handleFile = e => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file);
  };

  return (
    <Dialog open={props.open} maxWidth="sm" fullWidth onClose={props.onClose}>
      <DialogTitle> {"Add Photo"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Photo Title"
          fullWidth
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <Button variant="contained" style={{ margin: 20 }}>
          choose a file
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          cancel
        </Button>
        <input
          type="file"
          onChange={handleFile}
        />
        <Button
          color="primary"
          variant="contained"
          autoFocus
          onClick={handleSavePhoto}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
