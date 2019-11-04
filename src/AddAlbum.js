import React, { useState, useEffect } from "react";
import { Dialog, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "./firebase";
export default function AddAlbum(props) {
  const [name, setName] = useState("");
  const handleSaveAlbum = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .add({ name: name });
    props.onClose();
  };
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle> {"Add an Album"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Album Name"
          fullWidth
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          autoFocus
          onClick={handleSaveAlbum}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
