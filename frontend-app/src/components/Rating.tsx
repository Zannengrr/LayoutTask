import { Flex, HStack, Text } from "@chakra-ui/react";
import styles from "../styles/rating.module.css";

function processRating(ratingProps: Partial<StarRatingProps>): StarRatingProps{
    const defaultRating = {
        rating: 2.5,
        maxRating: 5
    }

    const maxRating = typeof ratingProps.maxRating === "number" && ratingProps.maxRating && ratingProps.maxRating > 0 ? Math.floor(ratingProps.maxRating) : defaultRating.maxRating;
    const rating = typeof ratingProps.rating === "number" && ratingProps.rating && ratingProps.rating > 0 && ratingProps.rating <= maxRating ? ratingProps.rating : defaultRating.rating;

    return {
        rating,
        maxRating
    }
}

interface StarRatingProps {
    rating: number;
    maxRating?: number;
}


const StarRating = (data : StarRatingProps) => {
    const processedData = processRating(data);
    const percentage = Math.round((processedData.rating / processedData.maxRating!) * 100);
    return (
        <HStack 
        borderTopLeftRadius="12" 
        borderTopRightRadius="12" 
        bgColor="white" 
        padding="12px 30px" 
        marginTop="auto" 
        width="80%" 
        justifyContent="space-between"
        color="black"
        zIndex={1}
        >
            <Text fontSize="0.7em" fontWeight="500" float="left">Trip rating</Text>
            <Flex float="right">
                <div className={styles.container}>
                    {/* Create an array based on the max rating, render a star for each */}
                    {Array.from(Array(processedData.maxRating!).keys()).map((_, i) => (
                        <IconStar key={String(i)} className={styles.star} />
                    ))}
                    {/* Render a div overlayed on top of the stars that are not filled */}
                    <div
                        className={styles.overlay}
                        style={{ width: `${100 - percentage}%` }}
                    />
                </div>
                <Text>{processedData.rating}</Text>
            </Flex>
        </HStack>
    );
};

export default StarRating;

export function IconStar({ className }: { className?: string }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12.8649 2.99628C12.4796 2.33213 11.5204 2.33213 11.1351 2.99628L8.42101 7.67359C8.23064 8.00168 7.90159 8.22557 7.52653 8.28222L2.44021 9.05044C1.58593 9.17947 1.28627 10.2581 1.95158 10.8093L5.74067 13.9485C6.09141 14.2391 6.25633 14.6975 6.17113 15.1449L5.17996 20.35C5.02327 21.1729 5.88706 21.8122 6.62821 21.4219L11.4176 18.9001C11.7821 18.7082 12.2178 18.7082 12.5824 18.9001L17.3718 21.4219C18.1129 21.8122 18.9767 21.1729 18.82 20.35L17.8289 15.1449C17.7437 14.6975 17.9086 14.2391 18.2593 13.9485L22.0484 10.8093C22.7137 10.2581 22.4141 9.17947 21.5598 9.05044L16.4735 8.28222C16.0984 8.22557 15.7694 8.00168 15.579 7.67359L12.8649 2.99628Z"
                fill="currentColor"
            />
        </svg>
    );
}