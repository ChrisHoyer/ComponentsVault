import { useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '../api';

// Custom hook for form submission
const postTablePart = () => {
  const submitFormData = useCallback(async (tablename, formData, onSuccess) => {
    if (!tablename) {
      toast.error('Table name is missing!');
      return;
    }

    try {
      await api.post(`/parts-api/tables/parts?tablename=${encodeURIComponent(tablename)}`, formData);
      toast.success('Part added successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(`Error adding part: ${error.message}`);
    }
  }, []);

  return { submitFormData };
};

export default postTablePart;