import React, { useState, useEffect } from "react";

export default function Stats(props) {
  return (
    <>
      {props.stats.map((stat) => {
        return (
          <div key={stat.id} className="stat">
            <h1>{stat.name}</h1>
            <img src={stat.img} />
            <h2>{stat.yards}</h2>
            <h3>{stat.team}</h3>
          </div>
        );
      })}
    </>
  );
}
