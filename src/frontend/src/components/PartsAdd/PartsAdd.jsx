// AddDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

import PartDetailsPage from './PartsAdd_BasicData';
import FootprintsSymbolsPage from './PartsAdd_Lib';
import ComponentLinksPage from './PartsAdd_Links';
import SuppliersPage from './PartsAdd_Supplier';
import FeaturesPage from './PartsAdd_Features';

import usePartsAddModel from '../../hooks/usePartsAddData';

const AddDialog = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false); 

  // Access the form data and handlers from the model hook
  const {
    formData,
    handleInputChange,
    handleAddItem,
    handleRemoveItem,
    handleAddFeature,
    handleRemoveFeature,
  } = usePartsAddModel();

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleValidationChange = (valid) => {
    setIsStepValid(valid);
  };

  const handleSubmit = () => {
    console.log(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Part</DialogTitle>
      <DialogContent>
        {currentStep === 0 && (
          <PartDetailsPage 
            formData={formData} 
            handleInputChange={handleInputChange}
            onValidationChange={handleValidationChange}
          />
        )}
        {currentStep === 1 && (
          <FootprintsSymbolsPage
            formData={formData}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            onValidationChange={handleValidationChange}
          />
        )}
        {currentStep === 2 && (
          <ComponentLinksPage
            formData={formData}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />
        )}
        {currentStep === 3 && (
          <SuppliersPage
            formData={formData}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />
        )}
        {currentStep === 4 && (
          <FeaturesPage
            formData={formData}
            handleAddFeature={handleAddFeature}
            handleRemoveFeature={handleRemoveFeature}
          />
        )}
      </DialogContent>
      <DialogActions>
        {currentStep > 0 && (
          <Button onClick={handlePrevStep} color="primary">
            Back
          </Button>
        )}
        {currentStep < 4 ? (
          <Button onClick={handleNextStep} color="primary" disabled={!isStepValid}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
