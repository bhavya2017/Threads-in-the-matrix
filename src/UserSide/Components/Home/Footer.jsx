import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      minH={"30vh"}
      bg="gray.100"
      padding={{ base: "0.5rem", lg: "3rem" }}
      className="footerChild"
      color={"gray.600"}
    >
      <Flex
        width={{ base: "100%", lg: "70%" }}
        flexDir={{ base: "column", lg: "row" }}
        margin={"auto"}
        textAlign={{ base: "center", lg: "start" }}
        textTransform="capitalize"
        cursor={"pointer"}
      >
        <Box width={{ base: "100%", lg: "20%" }}>
          <Text my="1rem" fontWeight="bold">
            Customer Policies
          </Text>
          <Text>Contact Us</Text>
          <Text>FAQ</Text>
          <Text>T&C</Text>
          <Text>Terms Of Use</Text>
          <Text>Privacy Policy</Text>
          <Text>Grievance Officer</Text>
        </Box>
        <Box width={{ base: "100%", lg: "33%" }}>
          <Flex direction="column" alignItems={{ base: "center", lg: "start" }}>
            <Text fontWeight="bold" mb="0.5rem">
              Follow Us at
            </Text>
            <Flex gap="2" alignItems="center" mb="0.5rem">
              <FaInstagram fontSize={"2rem"} />
              <Text>@Thread_in_the_matrix</Text>
            </Flex>
            <Flex gap="2" alignItems="center">
              <FaEnvelope fontSize={"2rem"} />
              <Text>Threadsinthematrix@gmail.Com</Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          width={{ base: "90%", lg: "27%" }}
          margin={{ lg: "0rem" }}
          mx="auto"
        >
          {/* Empty box as per your layout */}
        </Box>
      </Flex>
      <Flex
        width={{ base: "100%", lg: "70%" }}
        margin={"auto"}
        align="center"
        mt="1.4rem"
      >
        <Text
          borderBottom={"1px solid grey"}
          width={{ base: "60%", lg: "80%" }}
        ></Text>
      </Flex>
      <Flex
        width={{ base: "100%", lg: "70%" }}
        gap="2"
        margin={"auto"}
        justify="space-between"
        flexDir={{ base: "column", md: "row" }}
      >
        <Text textAlign={"center"}>
          In case of any concern,{" "}
          <Text as="span" color={"purple.500"} fontWeight="700">
            Contact Us
          </Text>{" "}
          at <Text as="span" fontWeight="bold">Threadsinthematrix@gmail.Com</Text>
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;