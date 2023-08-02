import {
  ChakraProvider,
  Box,
  VStack,
  theme,
} from "@chakra-ui/react"
import TravelData from "../components/TravelData"

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bgColor="#f6f7f9">
        <VStack minH="100vh" spacing={8} justifyContent="center">
          <TravelData />
        </VStack>
      </Box>
    </ChakraProvider>
  )
}
