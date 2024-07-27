import { Box, Flex } from "@chakra-ui/react";
import "./MegaMenu.css";
import React from "react";
import { Link } from "react-router-dom";

const MegaMenu = () => {
  return (
    <Flex
      height={"100%"}
      align="center"
      display={{ base: "none", lg: "Flex" }}
      width="36%"
      minW={"28rem"}
      justify={"space-around"}
      pos="relative"
    >
      <Flex
        height="100%"
        align={"center"}
        width="15%"
        justify={"center"}
        className="dropDown"
      >
        
  
      <Flex
        height="100%"
        align={"center"}
        width="15%"
        className="dropDown"
        justify={"center"}
      >
        
      </Flex>
        <Link to="/product/WomensData">Womens</Link>
        <Box
          top="4rem"
          className="child"
          left="-2rem"
          pos={"absolute"}
          width="1000px"
          transition={"all 0.3s"}
          height={"0vh"}
          overflow="hidden"
          bg="white"
        >
          <div className="menu">
      
              
            <div className="menulist">
              <ul>
                <p className="women-p"> Western Wear</p>
                <li>
                  <Link> Tops</Link>
                </li>
                <li>
                  <Link>Tshirts</Link>
                </li>
                <li>
                  <Link>Jeans</Link>
                </li>      
              </ul>
              <hr />
              <ul>
                <p className="women-p">Plus Size</p>
                <p className="women-p">Sports & Active Wear</p>
                
                
                
              </ul>
              <hr />
              <ul>
                <p className="women-p">Plus Size</p>
          

              </ul>
            </div>

           
    
               

          </div>
        </Box>
      </Flex>
      <Flex
        height="100%"
        align={"center"}
        width="15%"
        justify={"center"}
        className="dropDown"
      >
       
        
      </Flex>
    </Flex>
  );
};

export default MegaMenu;
