import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr");

    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

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

    // const btns = new Array(132).fill(1);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/markets?vs_currency=${currency}&page=${page}`
                );
                setCoins(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCoins();
    }, [currency, page]);

    if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;

    return (
        <Container maxW={"container.xl"}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <HStack justifyContent={"space-between"}>
                        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                            <HStack spacing={"4"}>
                                <Radio value={"inr"}>INR</Radio>
                                <Radio value={"usd"}>USD</Radio>
                                <Radio value={"eur"}>EUR</Radio>
                            </HStack>
                        </RadioGroup>
                        <Text textTransform={"capitalize"} fontWeight={"bold"} borderBottomRadius={"ipx solid gray"}>you are at page {page}</Text>
                    </HStack>
                    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                        {coins.map((i) => (
                            <CoinCard
                                id={i.id}
                                key={i.id}
                                name={i.name}
                                price={i.current_price}
                                img={i.image}
                                symbol={i.symbol}
                                currencySymbol={currencySymbol}
                            />
                        ))}
                    </HStack>

                    {/* <HStack w={"full"} overflowX={"auto"} p={"8"}>
                        {btns.map((item, index) => (
                            <Button
                                key={index}
                                bgColor={"blackAlpha.900"}
                                color={"white"}
                                onClick={() => changePage(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </HStack> */}

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
            )}
        </Container>
    );
};

export default Coins;
