import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ResponsePage() {
  const location = useLocation();
  const state = location.state as { text?: string }; // Type assertion for location.state
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchAnalysis = async () => {
  //     try {
  //       const text = state?.text;
  //       if (!text) {
  //         console.error("No text provided in location state");
  //         return; // Exit early if no text is provided
  //       }

  //       // setAnalysis(data);
  //     } catch (err) {
  //       setError(err as Error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnalysis();
  // }, [state]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  if (true) {
    return <div><h1>Congratulations, your content was a conversation!</h1></div>;
  }

  return (
    <div>
      <h1>Analysis</h1>
      <pre>{analysis}</pre>
    </div>
  );
}

export default ResponsePage;
