import { Box, Text } from "@chakra-ui/react";

const EmissionOffset = ({ offsetInKg }: { offsetInKg: number }) => {
    const emissionOffsetInTons = offsetInKg / 1000;

    return (
        <Box bgColor="#1f2837" borderRadius="12" width="80%" padding="3" marginTop="30px" zIndex={1}>
           <Text float="left">Emission offset:</Text>
           <Text float="right">{emissionOffsetInTons >= 1 ? `${emissionOffsetInTons} t` : `${offsetInKg} Kg`} CO<sub>2</sub>e</Text>
        </Box>
    )
}

export default EmissionOffset;