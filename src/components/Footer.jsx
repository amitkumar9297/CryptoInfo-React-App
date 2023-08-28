import React from 'react'
import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react"

const Footer = () => {
    return (
        <Box minH={"48"} px={"16"} py={["16", "8"]} bgColor={"blackAlpha.800"} color={"whiteAlpha.900"}>
            <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
                <VStack w={"full"} alignItems={["center", "flex-start"]}>
                    <Text fontWeight={"bold"}>About us</Text>
                    <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center", "left"]}>This is one of the best CryptoInfo App. We provide our guidence at very regional price</Text>
                </VStack>
                <VStack>
                    <Avatar boxSize={"28"} mt={["4", "0"]} />
                    <Text>Our Founder</Text>
                </VStack>

            </Stack>
        </Box>
    )
}

export default Footer