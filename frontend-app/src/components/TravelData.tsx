import { useEffect, useState } from "react";
import ImageDetails from "./ImageDetails";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";

interface serverTravelData {
    data: TravelData[];
}

const TravelData = () => {
    const [travelData, setTravelData] = useState<TravelData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

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
                    setError(error);
                }).finally(() => {
                    setIsLoading(false);
                });
        }

        //Server Side Event
        const eventSource = new EventSource("http://localhost:7777/sse");
        eventSource.onmessage = (event: MessageEvent) => {
            const updatedData = JSON.parse(event.data) as serverTravelData;
            console.log(JSON.stringify(updatedData));
            setTravelData(updatedData.data);
        };;
        eventSource.onerror = (error) => {
            console.error(`Error: ${JSON.stringify(error)}`);
        }
        eventSource.onopen = () => {
            console.log(`EventSource opened`);
        }

        fetchData();
        return () => {
            eventSource.close();
        }

    }, [])

    if (isLoading) return <Spinner />;
    if (error) return <Text>Error: {error.message} </Text>;
    return (
        <>
            <SimpleGrid columns={[1, null, null, 2, 3]} spacing={10}>
                {travelData && travelData.map((travelData, index) => <ImageDetails key={`${travelData.title}-${index}`} {...travelData} />)}
            </SimpleGrid>
        </>
    );
}

export default TravelData;