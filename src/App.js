import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { Link, Route } from "react-router-dom";
import { auth, db, snapshotToArray } from "./firebase";
import Photos from "./Photos";
import AddAlbum from "./AddAlbum";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dialog_open, setDialogOpen] = useState(false);
  const [albums, setAlbums] = useState([
    { id: 0, name: "Nature" },
    { id: 1, name: "Fam" }
  ]);

  useEffect(() => {
    const refresh = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });
    return refresh;
  }, [props.history]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("albums")
        .onSnapshot(snapshot => {
          const updated_albums = snapshotToArray(snapshot);
          setAlbums(updated_albums);
        });
    }
  }, [user]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {})
      .catch(error => {
        window.alert(error.message);
      });
  };

  const handleMenuOpen = () => {
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  if (!user) return <div />;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            News
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer_open} onClose={handleCloseDrawer}>
        <List component="nav">
          {albums.map(a => {
            return (
              <ListItem
                button
                to={"/app/album/" + a.id + "/"}
                component={Link}
                onClick={() => {
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={a.name} />
              </ListItem>
            );
          })}

          <ListItem
            button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <ListItemText primary="Create New" />
          </ListItem>
        </List>
      </Drawer>
      <AddAlbum
        open={dialog_open}
        onClose={() => {
          setDialogOpen(false);
        }}
        user={user}
      />
      <Route
        path="/app/album/:album_id/"
        render={routeProps => {
          return <Photos user={user} {...routeProps} />;
        }}
      />
    </div>
  );
}
