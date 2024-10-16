// src/reportWebVitals.ts
const reportWebVitals = (onPerfEntry?: (metric: { name: string; value: number }) => void) => {
    if (onPerfEntry) {
      const metrics = {
        name: 'some_metric_name',
        value: Math.random(), // Replace with actual performance metric if needed
      };
      onPerfEntry(metrics);
    }
  };
  
  export default reportWebVitals;
  