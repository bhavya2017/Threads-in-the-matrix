import React, { useState } from 'react';
import { Box, Button, Checkbox, Image, Text, VStack, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [skipClicked, setSkipClicked] = useState(false); // State to track whether "Skip" button is clicked
  const [measurements, setMeasurements] = useState({ waist: 0, bust: 0, hip: 0 });
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  const handleMeasurementChange = (e, type) => {
    setMeasurements({ ...measurements, [type]: parseFloat(e.target.value) });
  };

  const handleSkip = () => {
    setSkipClicked(true);
  };

  return (
    <Box className="landing-page" textAlign="center" py={10} px={6}>
      {/* Logo */}
      <Image src="/logo.png" alt="Logo" mx="auto" mb={6} className="logo" />

      <Box className="content-container">
        <Box flex="1" textAlign="left" mr={6}>
          {/* Terms and Conditions */}
          <Box className="terms-box">
            <Text fontSize="lg" mb={4}>
              Terms and Conditions
            </Text>
            <Text mb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
            </Text>
            <Text mb={4}>
              Nulla facilisi. Phasellus convallis, elit a ultricies ultricies, metus lectus ullamcorper libero, quis dictum mauris nisi id urna.
            </Text>
            <Text>
              Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur aliquet quam id dui posuere blandit.
            </Text>
          </Box>

          {/* Checkbox */}
          <Checkbox isChecked={agreed} onChange={handleCheckboxChange} mb={6}>
            I agree to the terms and conditions
          </Checkbox>

          {/* Buttons */}
          <VStack spacing={4}>
            <Button
              colorScheme="teal"
              onClick={() => navigate('/home')}
              isDisabled={!agreed}
            >
              Visit Store
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => navigate('/login')}
              disabled={!agreed} // Enable the button only when agreed is true
            >
              Sign In
            </Button>
            {/* Render the sign-up line unconditionally */}
            <Text>If you are a new customer, <a href="/signup" className="sign-up-text">Register/SignUp</a></Text>
          </VStack>
        </Box>

        <Box flex="1" textAlign="left" ml={6}>
          {/* Measurement Section */}
          <Box className="measurement-box">
            <Text fontSize="lg" mb={4}>Measurement Details</Text>
            <Box mb={4}>
              <Text>Waist Measurement</Text>
              <Input
                type="number"
                value={measurements.waist}
                onChange={(e) => handleMeasurementChange(e, 'waist')}
                disabled={skipClicked} // Disable input when "Skip" button is clicked
              />
            </Box>
            <Box mb={4}>
              <Text>Bust Measurement</Text>
              <Input
                type="number"
                value={measurements.bust}
                onChange={(e) => handleMeasurementChange(e, 'bust')}
                disabled={skipClicked} // Disable input when "Skip" button is clicked
              />
            </Box>
            <Box mb={4}>
              <Text>Hip Measurement</Text>
              <Input
                type="number"
                value={measurements.hip}
                onChange={(e) => handleMeasurementChange(e, 'hip')}
                disabled={skipClicked} // Disable input when "Skip" button is clicked
              />
            </Box>
            {!skipClicked && (
              <Button colorScheme="red" onClick={handleSkip} mt={4}>
                Skip
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
