import { useState, useEffect } from "react";

/**
 * FetchAgreementData is a custom React hook that fetches agreement data from a specified endpoint.
 * It utilizes the useState and useEffect hooks to manage state and perform side effects respectively.
 * 
 * @returns {object} An object containing serviceAgreements array and isLoading boolean.
 * @property {array} serviceAgreements - An array containing agreement data fetched from the API.
 * @property {boolean} isLoading - A boolean indicating whether the data is still loading.
 */


export default function FetchAgreementData (){
  const [serviceAgreements, setServiceAgreements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://wasteit-backend.azurewebsites.net/agreement");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const jsonData = await response.json();
        setServiceAgreements(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { serviceAgreements, isLoading };
};