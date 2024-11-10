// src/components/PartsDetails.jsx
import React, { useState } from 'react';

const PartsDetails = ({ data }) => {
  const [paramExpanded, setParamExpanded] = useState(false);

  const filteredFeatures = data.features.filter((feature) => feature.data_value !== '');
  const ParameterList = paramExpanded ? filteredFeatures : filteredFeatures.slice(0, 4);

  const handleToggleParamExpand = (e) => {
    e.stopPropagation();
    setParamExpanded((prev) => !prev);
  };

  return (
    <div className="component-row-fullcontent">
      <div className="component-row-fullcontent-element">
        <img
          src="https://placehold.co/100x100"
          alt="Footprint Image"
          className="footprint-image"
        />
      </div>
      <div className="component-row-fullcontent-element">
        <img
          src="https://placehold.co/100x100"
          alt="Symbol Image"
          className="symbol-image"
        />
      </div>
      <div className="component-row-fullcontent-element">
        <table>
          <tbody>
            {ParameterList.map((parameter, index) => (
              <tr key={index}>
                <td className="parameter-key">{parameter.data_name}</td>
                <td className="parameter-value">{parameter.data_value}</td>
              </tr>
            ))}
            {filteredFeatures.length > 4 && (
              <tr>
                <td colSpan="2" className="toggle-row" onClick={handleToggleParamExpand}>
                  {paramExpanded ? 'Show less' : 'Show more'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartsDetails;
