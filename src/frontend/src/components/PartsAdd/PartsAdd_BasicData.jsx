import React, {useState, useEffect} from 'react';
import {TextField, Autocomplete} from '@mui/material';

import TextFieldWithDropdown from '../_generic/TextFieldWithDropdown';
import TextFieldWithMultiSelect from '../_generic/TextFieldWithMultiSelect';
import getTableColumnValues from '../../hooks/getTableColumnValues'; 

const PartDetailsPage = ({ formData, handleInputChange, onValidationChange }) => {
  const [isValid, setIsValid] = useState(false);
  const { columns, loading, error, fetchTableColumns } = getTableColumnValues();

  useEffect(() => { fetchTableColumns('manufacturer'); }, [fetchTableColumns]);

  useEffect(() => {
    const requiredFields = ['part_number', 'comment'];
    const allFilled = requiredFields.every((field) => formData[field] && formData[field].trim() !== '');
    setIsValid(allFilled);
    onValidationChange(isValid);
  }, [formData, isValid, onValidationChange]);


  return (
    <div>
      <TextField
        label="Part Number"
        name="part_number"
        value={formData.part_number}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
        required
      />

      <Autocomplete
        freeSolo
        disablePortal
        id="manufacturer"
        options={columns}  // The fetched manufacturers for autofill
        value={formData.manufacturer}
        onInputChange={(event, newValue) => handleInputChange({ target: { name: 'manufacturer', value: newValue } })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Manufacturer"
            name="manufacturer"
            fullWidth
            margin="dense"
          />
        )}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
      />

      <TextFieldWithDropdown
        label="Comment"
        name="comment"
        value={formData.comment}
        onChange={handleInputChange}
        predefinedValues={ import.meta.env.VITE_PREDEFINED_COMMENT.split(',') }
        required
      />

      <TextFieldWithDropdown
        label="Lifecycle Status"
        name="lifecycle_status"
        value={formData.lifecycle_status}
        onChange={handleInputChange}
        predefinedValues={ import.meta.env.VITE_PREDEFINED_LIFECYCLE.split(',') }
        fullWidth
        margin="dense"
      />

      <TextFieldWithDropdown
        label="Mounting Style"
        name="mounting_style"
        value={formData.mounting_style}
        onChange={handleInputChange}
        predefinedValues={ import.meta.env.VITE_PREDEFINED_MOUNTING.split(',') }
        fullWidth
        margin="dense"
      />

      <TextField
        label="Case Package"
        name="case_package"
        value={formData.case_package}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
      />

      <TextFieldWithDropdown
        label="RoHS Status"
        name="rohs_status"
        value={formData.rohs_status}
        onChange={handleInputChange}
        predefinedValues={ import.meta.env.VITE_PREDEFINED_ROHS.split(',') }
        fullWidth
        margin="dense"
      />

      <TextFieldWithDropdown
        label="REACH Status"
        name="reach_status"
        value={formData.reach_status}
        onChange={handleInputChange}
        predefinedValues={ import.meta.env.VITE_PREDEFINED_REACH.split(',') }
        fullWidth
        margin="dense"
      />

      <TextFieldWithDropdown
        label="Ratings"
        name="ratings"
        value={formData.ratings}
        onChange={handleInputChange}
        predefinedValues={ import.meta.env.VITE_PREDEFINED_RATINGS.split(',') }
        fullWidth
        margin="dense"
      />
    </div>
  );
};

export default PartDetailsPage;
