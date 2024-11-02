import React, { forwardRef } from 'react';
import "../styles/ComponentRow.css";

const ComponentRow = forwardRef(({ data }, ref) => {
  return (
    <div className="row" ref={ref}>
      <pre>{JSON.stringify(data.partid, null, 2)}</pre>
      <pre>{JSON.stringify(data.manufacturer, null, 2)}</pre>
      <pre>{JSON.stringify(data.part_number, null, 2)}</pre>
    </div>
  );
});

export default ComponentRow;
