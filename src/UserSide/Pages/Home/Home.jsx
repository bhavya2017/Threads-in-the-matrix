import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../Components/Home/Navbar";
import SimpleSlider from "../../Components/Home/FullScreenSlider";
import ProductSlider from "../../Components/Home/ProductSlider";
import {
  categoriesToBagList2,
  categoriesToBagList3,
  dealsOnTopBrandsList2,
  dealsOnTopBrandsList3,
  imageList2,
  imageList3,
  topPicksList,
} from "../../../Utils/ProductImages";
import "./Home.css";
import ListHeading from "../../Components/Home/ListHeading";
import Footer from "../../Components/Home/Footer";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <SimpleSlider />
      <Box>
        <ListHeading text=" Deal of the Day" />
        <ProductSlider
          imageData={imageList2}
          width="184px"
          height={"242px"}
          gap="2"
        />
      
        <ProductSlider
          imageData={imageList3}
          width="184px"
          height={"242px"}
          gap="2"
        />
      </Box>
      <Box mt="3rem">
        <ListHeading text=" top picks" />
        <ProductSlider
          imageData={topPicksList}
          width="217px"
          height={{ base: "265px", lg: "265px" }}
          gap="2"
        />
      </Box>
      <Box mt={"3rem"}>
        <ListHeading text="categories to bag" />
       
        <ProductSlider
          imageData={categoriesToBagList2}
          width="189.9px"
          height={"235px"}
          gap="0"
        />
        <ProductSlider
          imageData={categoriesToBagList3}
          width="189.9px"
          height={"235px"}
          gap="0"
        />
      </Box>
      <Box mt={"3rem"}>
        <ListHeading text="Deals on top brands" />
        
        <ProductSlider
          imageData={dealsOnTopBrandsList2}
          width="189.9px"
          height={"308px"}
          gap="0"
        />
        <ProductSlider
          imageData={dealsOnTopBrandsList3}
          width="189.9px"
          height={"308px"}
          gap="0"
        />
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Home;
