// FootprintsSymbolsPage.jsx
import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FootprintsSymbolsPage = ({ formData, setFormData, handleAddItem, handleRemoveItem }) => {
  return (
    <div>
      {formData.lib_footprint.map((item, index) => (
        <div key={index}>
          <TextField
            label="Footprint Ref"
            value={item.footprint_ref}
            onChange={(e) =>
              setFormData({
                ...formData,
                lib_footprint: formData.lib_footprint.map((f, i) =>
                  i === index ? { ...f, footprint_ref: e.target.value } : f
                ),
              })
            }
          />
          <TextField
            label="Footprint Path"
            value={item.footprint_path}
            onChange={(e) =>
              setFormData({
                ...formData,
                lib_footprint: formData.lib_footprint.map((f, i) =>
                  i === index ? { ...f, footprint_path: e.target.value } : f
                ),
              })
            }
          />
          <IconButton onClick={() => handleRemoveItem('lib_footprint', index)}>
            <RemoveIcon />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={() => handleAddItem('lib_footprint')}>
        <AddIcon />
      </IconButton>

      {formData.lib_symbol.map((item, index) => (
        <div key={index}>
          <TextField
            label="Symbol Ref"
            value={item.symbol_ref}
            onChange={(e) =>
              setFormData({
                ...formData,
                lib_symbol: formData.lib_symbol.map((s, i) =>
                  i === index ? { ...s, symbol_ref: e.target.value } : s
                ),
              })
            }
          />
          <TextField
            label="Symbol Path"
            value={item.symbol_path}
            onChange={(e) =>
              setFormData({
                ...formData,
                lib_symbol: formData.lib_symbol.map((s, i) =>
                  i === index ? { ...s, symbol_path: e.target.value } : s
                ),
              })
            }
          />
          <IconButton onClick={() => handleRemoveItem('lib_symbol', index)}>
            <RemoveIcon />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={() => handleAddItem('lib_symbol')}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default FootprintsSymbolsPage;
