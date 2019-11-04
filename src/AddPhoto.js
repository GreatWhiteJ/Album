import React, { useState } from "react";
import { Dialog, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db, storage } from "./firebase";
import uuid from "node-uuid";
export default function AddPhoto(props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const handleSavePhoto = () => {
    setSaving(true);
    storage
      .ref("photos/" + uuid())
      .put(file)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          db.collection("users")
            .doc(props.user.uid)
            .collection("albums")
            .doc(props.album_id)
            .collection("photos")
            .add({ title: title, image: downloadURL })
            .then(() => {
              setTitle("");
              setFile(null);
              setSaving(false);
              props.onClose();
            });
        });
      });
  };

  const handleFile = e => {
    const file = e.target.files[0];
    setFile(file);
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
        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <Button variant="contained" component="label">
            <input
              type="file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
            choose a file
          </Button>
          <Typography style={{ marginLeft: 10 }}>
            {file ? file.name : <div />}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          cancel
        </Button>

        <div style={{ display: "flex", position: "relative" }}>
          <Button
            color="primary"
            variant="contained"
            autoFocus
            onClick={handleSavePhoto}
          >
            save
          </Button>
          {saving ? (
            <LinearProgress
              style={{ width: "68px", marginTop: "23%", position: "absolute" }}
              color="secondary"
            />
          ) : (
            <div />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
