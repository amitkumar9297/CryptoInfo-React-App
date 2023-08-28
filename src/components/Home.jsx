import React, { useEffect, useState } from 'react'
import { Box, Button, HStack, Image, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react"
import btcsrc from "../assets/btc.png";
import { motion } from "framer-motion"
import axios from 'axios';
import ErrorComponent from "./ErrorComponent"
import { server } from "../index"
import CoinCard from './CoinCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [topCoin, setTopCoin] = useState([]);
    const [error, setError] = useState(false);

    const [currency, setCurrency] = useState("inr");


    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/markets?vs_currency=${currency}&per_page=${10}`
                );
                setTopCoin(data);
            } catch (error) {
                setError(true);
            }
        };
        fetchCoins();
    }, [currency]);

    if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;



    return (
        <>
            <Box w={"full"} h={"85vh"}>
                <motion.div
                    style={{ height: "80vh" }}
                    animate={{ translateY: "20px" }}
                    transition={{ duration: "3", repeat: Infinity, repeatType: "reverse" }}
                >
                    <Image
                        w={"full"}
                        h={"full"}
                        objectFit={"contain"}
                        src={btcsrc}
                        filter={"grayscale(1)"} />
                </motion.div>
                <Text
                    fontSize={"6xl"}
                    textAlign={"center"}
                    fontWeight={"thin"}
                    mt={"-20"}
                >
                    CryptoInfo
                </Text>
            </Box>
            <HStack justifyContent={"space-between"}>
                <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                    <HStack spacing={"4"}>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                    </HStack>
                </RadioGroup>
            </HStack>
            <VStack mb={"20"}>
                <HStack wrap={"wrap"} justifyContent={"space-evenly"} mb={"10"}>
                    {topCoin.map((i) => (
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
                <HStack>
                    <Button onClick={() => navigate("/coins")}>Show More</Button>
                </HStack>
            </VStack>
        </>
    )
}

export default Home