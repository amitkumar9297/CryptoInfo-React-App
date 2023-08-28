import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = props => {
    const { toggleColorMode } = useColorMode();
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <IconButton
            variant="ghost"
            color="purple.300"
            pos={'fixed'}
            top={"4"}
            right={"4"}
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            zIndex={"overlay"}
            {...props}
        />
    );
};

export default ColorModeSwitcher;
