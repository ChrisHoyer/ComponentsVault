// SuppliersPage.jsx
import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SuppliersPage = ({ formData, setFormData, handleAddItem, handleRemoveItem }) => {
  return (
    <div>
      {formData.supplier.map((supplier, index) => (
        <div key={index}>
          <TextField
            label="Supplier"
            value={supplier.supplier}
            onChange={(e) =>
              setFormData({
                ...formData,
                supplier: formData.supplier.map((s, i) =>
                  i === index ? { ...s, supplier: e.target.value } : s
                ),
              })
            }
          />
          <TextField
            label="Supplier Part Number"
            value={supplier.supplier_part_number}
            onChange={(e) =>
              setFormData({
                ...formData,
                supplier: formData.supplier.map((s, i) =>
                  i === index
                    ? { ...s, supplier_part_number: e.target.value }
                    : s
                ),
              })
            }
          />
          <IconButton onClick={() => handleRemoveItem('supplier', index)}>
            <RemoveIcon />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={() => handleAddItem('supplier')}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default SuppliersPage;
