import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import { Button } from "@material-ui/core";

export default function Photos(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  const [photos, setPhotos] = useState([
    {
      id: 0,
      title: "mountian",
      image:
        "https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 1,
      title: "tree",
      image:
        "https://images.pexels.com/photos/2767557/pexels-photo-2767557.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 2,
      title: "lake",
      image:
        "https://images.pexels.com/photos/2832023/pexels-photo-2832023.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
  ]);

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
