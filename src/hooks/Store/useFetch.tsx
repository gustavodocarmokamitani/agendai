import { useEffect, useRef } from "react";
import { decodeToken } from "../../services/AuthService";
import { getStoreById } from "../../services/StoreServices";
import { DecodedToken } from "../../models/DecodedToken";
import { Store } from "../../models/Store";

export const useFetch = (
  storeUser: number,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
  setStore: React.Dispatch<React.SetStateAction<Store | null>>,
  setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const fetchDataRef = useRef(false);
  const storedToken = localStorage.getItem("authToken");

  const fetchData = async () => {
    try {
      if (storedToken) {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      }
      const response = await getStoreById(storeUser);
      if (response) {
        setStore(response);
        const horariosArray = response.operatingHours
          ? response.operatingHours.split(" - ")
          : [];
        setSelectedTimes(horariosArray);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da loja:", error);
    }
  };

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  return {};
};
