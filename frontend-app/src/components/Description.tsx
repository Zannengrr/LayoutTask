import { Box, Text } from "@chakra-ui/react";

interface DescriptionProps {
    title: string;
    numberOfCountries: number;
    numberOfDays: number;
}

const Description = ({ title, numberOfCountries, numberOfDays }: DescriptionProps) => {
    const countriesString = numberOfCountries > 1 ? "Countries" : "country";
    const daysString = numberOfDays > 1 ? "days" : "day";

    return (
        <Box marginTop="15%" zIndex={1}>
            <Text fontSize="1.1em">{title}</Text>
            <Text fontSize="0.7em" fontWeight="400">{numberOfCountries} {countriesString}, {numberOfDays} {daysString}</Text>
        </Box>
    )
}

export default Description;