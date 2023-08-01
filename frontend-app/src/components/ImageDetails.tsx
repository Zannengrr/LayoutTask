import { Card, Flex } from "@chakra-ui/react"
import Description from "./Description"
import EmissionOffset from "./EmisisonOffset"
import StarRating from "./Rating"

function processTravelData(data: Partial<TravelData>): TravelData {

    const defaultData: TravelData = {
        title: "Title missing",
        co2Emission: 0,
        imageName: "fallback.jpg",
        numberOfDays: 0,
        numberOfCountries: 0,
        rating: 2.5
    }

    const title = (typeof data.title === "string" && data.title) ? data.title : defaultData.title;
    const numberOfCountries = (typeof data.numberOfCountries === "number" && data.numberOfCountries && data.numberOfCountries > 0) ? data.numberOfCountries : defaultData.numberOfCountries;
    const numberOfDays = (typeof data.numberOfDays === "number" && data.numberOfDays && data.numberOfDays > 0) ? data.numberOfDays : defaultData.numberOfDays;
    const co2Emission = (typeof data.co2Emission === "number" && data.co2Emission && data.co2Emission > 0) ? data.co2Emission : defaultData.co2Emission;
    const rating = (typeof data.rating === "number" && data.rating && data.rating > 0) ? data.rating : defaultData.rating;
    const imageName = (typeof data.imageName === "string" && data.imageName) ? data.imageName : defaultData.imageName;

    return {
        title, numberOfCountries, numberOfDays, co2Emission, rating, imageName
    }
}

const ImageDetails = (data: TravelData) => {
    const processedData = processTravelData(data);
    let imagePath = `../images/${processedData.imageName}`;
    const fallbackImagePath = `../images/fallback.jpg`;

    return (
        <Card padding="3" borderRadius="20" width="400px" height="300px">
            <Flex 
            backgroundImage={`url("${imagePath}"), url("${fallbackImagePath}")`}
            style={{
                backgroundImage: `url("${imagePath}"), url("${fallbackImagePath}")`
              }}
            bgSize="cover"
            borderRadius="12" 
            width="100%" 
            height="100%" 
            align="center" 
            justify="center" 
            flexDir="column"
            color = "white"
            >
                <Description title={processedData.title} numberOfCountries={processedData.numberOfCountries} numberOfDays={processedData.numberOfDays} />
                <EmissionOffset offsetInKg={processedData.co2Emission} />
                <StarRating rating={processedData.rating} />
            </Flex>
        </Card>
    )
}

export default ImageDetails;