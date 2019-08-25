import React from 'react';
import "./ColorBar.css";

export const ColorBar = (props) => { 
  return (
    <div className="ColorBar">
      {props.colors.map((color, index) => (
        <div
          key={color.height}
          className="swatch"
          style={{
            backgroundColor:
              "rgb( " +
              color.color[0] +
              "," +
              color.color[1] +
              "," +
              color.color[2] +
              ")"
          }}
        >
          {index === props.colors.length - 1 ? null : (
            <div key={color.height} className="label">
              {color.height} ft
            </div>
          )}
        </div>
      ))}
    </div>
  );
}