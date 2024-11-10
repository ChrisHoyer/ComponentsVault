import React, { useState, forwardRef } from 'react';
import { toast } from 'react-toastify';

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Internal components
import PartsDetails from './PartsDetails';

const PartsRow = forwardRef(({ data }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const lifecycleStatus = data.lifecycle_status ? data.lifecycle_status.trim() : '';
  let borderColor;

  switch (lifecycleStatus) {
    case 'Active':
      borderColor = 'var(--status-green)';
      break;
    case 'Not recommended':
      borderColor = 'var(--status-yellow)';
      break;
    case 'Not Listed by Manufacturer':
      borderColor = 'var(--status-red)';
      break;
    default:
      borderColor = 'var(--status-gray)';
  }

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCopyPartnumber = () => {
    navigator.clipboard.writeText(data.part_number);
    toast.success(`"${data.part_number}" copied to clipboard!`);
  };

  return (
    <div
      className="component-row-common"
      ref={ref}
      style={{ borderLeft: `15px solid ${borderColor}`, cursor: 'pointer' }}
      onClick={handleToggleOpen}
    >
      <div className="component-row-briefdata">
        <ContentCopyIcon
          className="component-row-copy-icon"
          onClick={(e) => {
            e.stopPropagation();
            handleCopyPartnumber();
          }}
          titleAccess="Copy to clipboard"
          style={{ fontSize: '16px' }}
        />
        <span className="component-row-part-number component-row-fixedparameter" title={data.part_number}>
          {data.part_number}
        </span>
        <span className="component-row-manufacturer component-row-fixedparameter" title={data.manufacturer}>
          {data.manufacturer}
        </span>
        <span className="component-row-description component-row-fixedparameter" title={data.description}>
          {data.description}
        </span>
        <span className="component-row-arrow">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      {isOpen && <PartsDetails data={data} />}
    </div>
  );
});

export default PartsRow;
