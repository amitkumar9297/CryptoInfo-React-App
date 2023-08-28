import React from 'react'
import { Button, HStack } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"} gap={"4"} pr={"10"}>
            <Button
                variant={"unstyled"}
                color={"white"}
                m={"2"}
                bgColor={'cyan.400'}
                // p={"2"}
                w={"100px"}
                textAlign={"center"}
                verticalAlign={"center"}
                css={{
                    "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: 'cyan'
                    }
                }}
            >
                <Link to={"/"}>Home</Link>
            </Button>
            <Button
                variant={"unstyled"}
                color={"white"}
                m={"2"}
                bgColor={'cyan.400'}
                // p={"2"}
                w={"100px"}
                textAlign={"center"}
                verticalAlign={"center"}
                css={{
                    "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: 'cyan'
                    }
                }}
            >
                <Link to={"/exchanges"}>Exchanges</Link>
            </Button>
            <Button
                variant={"unstyled"}
                color={"white"}
                m={"2"}
                bgColor={'cyan.400'}
                // p={"2"}
                w={"100px"}
                textAlign={"center"}
                verticalAlign={"center"}
                css={{
                    "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: 'cyan'
                    }
                }}
            >
                <Link to={"/coins"}>Coins</Link>
            </Button>
        </HStack >
    )
}

export default Header