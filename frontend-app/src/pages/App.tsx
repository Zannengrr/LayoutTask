import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  SimpleGrid,
} from "@chakra-ui/react"
import TravelData from "../components/TravelData"

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bgColor="#f6f7f9">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8} justifyContent="center">
            <SimpleGrid columns={[1, null, null, 2, 3]} spacing={10}>
              <TravelData />
            </SimpleGrid>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
