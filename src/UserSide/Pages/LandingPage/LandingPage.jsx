
import React, { useState } from 'react';
import { Box, Button, Checkbox, Image, Text, VStack, Input, UnorderedList, ListItem } from '@chakra-ui/react';
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
            <Text fontSize="lg" mb={4}>Terms and Conditions</Text>
            <Text fontSize="sm" mb={4}>By using our Virtual Fitting Room, you agree to comply with and be bound by the following terms and conditions:</Text>
            <UnorderedList mb={4}>
              <ListItem>We collect personal information, including body measurements and images to provide this service.</ListItem>
              <ListItem>Your data will be securely stored and protected using encryption and other security measures.</ListItem>
              <ListItem>Collected data will be used solely to enhance your virtual fitting experience.</ListItem>
              <ListItem>We do not share your data with third parties without your consent, except as required by law.</ListItem>
              <ListItem>Do not upload or create content that is offensive, discriminatory, or violates the rights of others.</ListItem>
              <ListItem>We may modify these terms at any time. Continued use of the Virtual Fitting Room constitutes acceptance of the updated terms.</ListItem>
            </UnorderedList>
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
