import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import { Button } from "@material-ui/core";
import { db, snapshotToArray } from "./firebase";

export default function Photos(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const refresh = db
      .collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .doc(props.match.params.album_id)
      .collection("photos")
      .onSnapshot(snapshot => {
        const updatedPhotos = snapshotToArray(snapshot);
        setPhotos(updatedPhotos);
      });
    return refresh;
  }, [props]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: 10 }}>
      {photos.map(p => {
        return <PhotoCard photo={p} />;
      })}
      <div>
        <Button
          color="secondary"
          variant="contained"
          style={{ margin: 10 }}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Add Photo
        </Button>{" "}
      </div>
      <AddPhoto
        open={dialog_open}
        onClose={() => {
          setDialogOpen(false);
        }}
        user={props.user}
        album_id={props.match.params.album_id}
      />
    </div>
  );
}
