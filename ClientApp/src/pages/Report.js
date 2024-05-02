import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Actions from "../components/Report/Actions";
import EstimatedEffects from "../components/Report/EstimatedEffects";

const Report = () => {
  const { state } = useLocation();
  const name = state?.name || null;
  const [optimizationData, setOptimizationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (name) {
      const fetchOptimizationData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('https://wasteit-backend.azurewebsites.net/optimization/' + name);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          
          setOptimizationData(data);
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false);
        }
      };

      fetchOptimizationData();
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <main className="main">
      <div style={{ textAlign: "center" }}>
        <h1>Optimization for {name}</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) :  (
            <div style={{marginTop: "50px"}}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Actions data={optimizationData}/>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <EstimatedEffects />
                </div>
            </div>
            )}
      </div>
    </main>
  );
};

export default Report;
