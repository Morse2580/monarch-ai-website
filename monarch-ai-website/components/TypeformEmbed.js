import React, { useEffect, useRef } from 'react';

const TypeformEmbed = ({ formId, style = {} }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && window.tf && window.tf.createWidget) {
      // Remove any previous widget in this container
      ref.current.innerHTML = '';
      window.tf.createWidget(formId, {
        container: ref.current,
        // Add more Typeform options here if needed
      });
    }
  }, [formId]);

  return <div ref={ref} style={{ minHeight: '500px', width: '100%', ...style }} />;
};

export default TypeformEmbed; 