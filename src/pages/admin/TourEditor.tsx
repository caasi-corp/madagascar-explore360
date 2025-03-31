import React from 'react';

interface TourEditorProps {
  useCategories?: boolean;
}

const TourEditor: React.FC<TourEditorProps> = ({ useCategories = false }) => {
  // Component implementation
  return (
    <div>
      {useCategories ? <h1>Tour Categories Editor</h1> : <h1>Tour Editor</h1>}
      {/* Rest of the component */}
    </div>
  );
};

export default TourEditor;
