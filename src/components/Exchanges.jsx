import React, { useEffect, useState } from 'react'
import axios from "axios";
import { server } from "../index"
import { Box, Button, Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const changePage = (page) => {
        if (page >= 1) {
            setPage(page);
            setLoading(true);
        }
        else {
            setPage(1);
            setLoading(true)
        }
    };
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges?page=${page}`);
                setExchanges(data);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };
        fetchExchanges();
    }, [page]);

    if (error) return <ErrorComponent message={"Error While Fetching Coins"} />

    return (
        <Container maxW={"container.xl"}>
            {
                loading ? (<Loader />
                ) : (
                    <>
                        <HStack justifyContent={"center"} m={5} fontSize={"25"}>
                            <Box borderBottom={"2px solid black"}>
                                <Text textTransform={"capitalize"} fontWeight={"bold"} borderBottomRadius={"ipx solid grey"}>you are at page {page}</Text>
                            </Box>
                        </HStack>
                        <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
                            {
                                exchanges.map((i) => (
                                    <a href={i.url} target={"blank"}>
                                        <VStack w={"52"}
                                            shadow={"lg"}
                                            p={"8"}
                                            borderRadius={"lg"}
                                            transition={"all 0.3s"}
                                            m={"4"}
                                            css={{
                                                "&:hover": {
                                                    transform: "scale(1.1)",
                                                },
                                            }}>
                                            <Image
                                                src={i.image}
                                                w={"10"}
                                                h={"10"}
                                                objectFit={"contain"}
                                                loading='lazy'
                                                alt={"Exchange"} />
                                            <Heading size={"md"} noOfLines={1}>{i.trust_score_rank}</Heading>
                                            <Text noOfLines={1}>{i.name}</Text>
                                        </VStack>
                                    </a >
                                ))
                            }
                        </HStack>
                        <HStack justifyContent={"space-around"} m={"10"}>
                            {
                                page <= 1 ? (<>
                                    <Button p={"5"} textTransform={"uppercase"} onClick={() => changePage(page - 1)} colorScheme="purple" borderRadius={"50px"} w={"40"} visibility={"hidden"}>previous</Button>
                                    <Button p={"5"} textTransform={"uppercase"} onClick={() => changePage(page + 1)} colorScheme="purple" borderRadius={"50px"} w={"40"}>next</Button>
                                </>) : (<><Button p={"5"} textTransform={"uppercase"} onClick={() => changePage(page - 1)} colorScheme="purple" borderRadius={"50px"} w={"40"}>previous</Button>
                                    <Button p={"5"} textTransform={"uppercase"} onClick={() => changePage(page + 1)} colorScheme="purple" borderRadius={"50px"} w={"40"}>next</Button></>)
                            }
                        </HStack>
                    </>
                )
            }
        </Container>
    )
};

// const ExchangeCard = ({ name, img, rank, url }) => {
//     <a href={url} target={"blank"}>
//         <VStack>
//             <Image
//                 src={img}
//                 w={"10"}
//                 // objectFit={"contain"}
//                 alt='exchanges' />
//             <Heading size={"md"} noOfLines={1}>{rank}</Heading>
//             <Text noOfLines={1}>{name}</Text>
//         </VStack>
//     </a >
// };

export default Exchanges
