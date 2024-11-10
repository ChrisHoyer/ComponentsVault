// PartsAdd_Model.jsx
import { useState } from 'react';

const usePartsAddModel = () => {
  const [formData, setFormData] = useState({

    // Default Model (Basic Fields)
    comment: '',
    description: '',
    part_number: '',
    manufacturer: '',
    lifecycle_status: '',
    mounting_style: '',
    case_package: '',
    rohs_status: '',
    reach_status: '',
    ratings: '',

    lib_footprint: [],
    lib_symbol: [],
    componentlink: [],
    supplier: [],
    features: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function for adding items to an array (like lib_footprint, lib_symbol, etc.)
  const handleAddItem = (type, newItem = {}) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], newItem]
    });
  };

  // Function for removing items from an array
  const handleRemoveItem = (type, index) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });
  };

  // Function to add new feature to features list
  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { data_name: '', data_value: '' }]
    });
  };

  // Function to remove a feature from features list
  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return {
    formData,
    handleInputChange,
    handleAddItem,
    handleRemoveItem,
    handleAddFeature,
    handleRemoveFeature,
  };
};

export default usePartsAddModel;
