import { useState } from 'react';
import styles from '../../styles/forms.module.css';

export default function EditableText({ initialValue, onSave, className, startInEditMode = false, disabled = false }) {
  const [isEditing, setIsEditing] = useState(startInEditMode && !disabled);
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={styles.inlineInput}
        autoFocus
      />
    );
  }

  return (
    <span className={className} onClick={handleClick}>
      {value}
    </span>
  );
}
