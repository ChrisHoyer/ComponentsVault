// FeaturesPage.jsx
import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FeaturesPage = ({ formData, setFormData, handleAddFeature, handleRemoveFeature }) => {
  return (
    <div>
      {formData.features.map((feature, index) => (
        <div key={index}>
          <TextField
            label="Feature Name"
            value={feature.data_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                features: formData.features.map((f, i) =>
                  i === index ? { ...f, data_name: e.target.value } : f
                ),
              })
            }
          />
          <TextField
            label="Feature Value"
            value={feature.data_value}
            onChange={(e) =>
              setFormData({
                ...formData,
                features: formData.features.map((f, i) =>
                  i === index ? { ...f, data_value: e.target.value } : f
                ),
              })
            }
          />
          <IconButton onClick={() => handleRemoveFeature(index)}>
            <RemoveIcon />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={handleAddFeature}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default FeaturesPage;
