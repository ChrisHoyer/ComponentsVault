// ComponentLinksPage.jsx
import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ComponentLinksPage = ({ formData, setFormData, handleAddItem, handleRemoveItem }) => {
  return (
    <div>
      {formData.componentlink.map((link, index) => (
        <div key={index}>
          <TextField
            label="Component Link Description"
            value={link.componentlink_description}
            onChange={(e) =>
              setFormData({
                ...formData,
                componentlink: formData.componentlink.map((l, i) =>
                  i === index
                    ? { ...l, componentlink_description: e.target.value }
                    : l
                ),
              })
            }
          />
          <TextField
            label="Component Link URL"
            value={link.componentlink_url}
            onChange={(e) =>
              setFormData({
                ...formData,
                componentlink: formData.componentlink.map((l, i) =>
                  i === index ? { ...l, componentlink_url: e.target.value } : l
                ),
              })
            }
          />
          <IconButton onClick={() => handleRemoveItem('componentlink', index)}>
            <RemoveIcon />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={() => handleAddItem('componentlink')}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default ComponentLinksPage;
