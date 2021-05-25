import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home/Index";
import Room from "./pages/room/Index";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/:room_id"
          component={(props) => <Room {...props} initiator={true} />}
        />
        <Route
          exact
          path="/j/:room_id"
          component={(props) => <Room {...props} initiator={false} />}
        />
      </BrowserRouter>
    </>
  );
}
