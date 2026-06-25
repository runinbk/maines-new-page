import { useEffect } from 'react';

/**
 * React Component to inject dynamic JSON-LD structured schemas to the HTML <head>
 * Auto-cleans the injected tag upon component unmount to prevent stale metadata.
 */
export const StructuredData = ({ schema, id = 'jsonld-schema' }) => {
  useEffect(() => {
    if (!schema) return;
    
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(schema);
    
    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [schema, id]);

  return null;
};

export default StructuredData;
