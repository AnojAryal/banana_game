import { Flex, Spacer } from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';

const NavBar = () => {
  return (
    <Flex as="nav" p="4" alignItems="center">
      <Spacer />
      <ColorModeSwitch />
    </Flex>
  );
};

export default NavBar;
