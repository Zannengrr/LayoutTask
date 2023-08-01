import { useEffect, useState } from "react";
import ImageDetails from "./ImageDetails";

interface serverTravelData{
    data:TravelData[];
}

const TravelData = () => {
    const [travelData, setTravelData] = useState<TravelData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const abortController: AbortController = new AbortController();
        const signal: AbortSignal = abortController.signal;
        const options: RequestInit = {
            method: "GET",
            signal: signal,
            headers: {
                "Content-Type": "application/json"
            }
        }

        const fetchData = async () => {
            await fetch("http://localhost:7777", options)
                .then(async response => {
                    const result = await response.json() as serverTravelData;
                    setTravelData(result.data);
                })
                .catch(error => {
                    console.log(`Error: ${error}`);
                }).finally(() => {
                    setIsLoading(false);
                });
        }

        fetchData();
        return () => {
            if(isLoading) abortController.abort();
        }
    }, [])

    if (isLoading) return "Loading";

    return (
        <>
            {travelData && travelData.map((travelData, index) => <ImageDetails key={`${travelData.title}-${index}`} {...travelData} />)}
        </>
    );
}

export default TravelData;