import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { useToast } from "@chakra-ui/toast";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/UserAuth/userAuth.actions";
import { Flex, Box, Text } from "@chakra-ui/layout";
import Navbar from "../UserSide/Components/Home/Navbar";
import Footer from "../UserSide/Components/Home/Footer";
import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: name,
        email,
        password,
        avatar: "",
        date: Date.now(),
      });
      dispatch(userLogin(res.user));
      localStorage.setItem("userInfoF", JSON.stringify(res.user));
      toast({
        title: "Sign up successful",
        description: "Have a great day.",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast({
        title: "Sign up failed",
        description: err.message,
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
      setError(err);
    }
  };

  const handleGoogle = async () => {
    try {
      let res = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        password: "111111",
        avatar: "",
        date: Date.now(),
      });
      toast({
        title: "Sign Up successful",
        description: "Have a great day.",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      dispatch(userLogin(res.user));
      localStorage.setItem("userInfoF", JSON.stringify(res.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup">
        <Flex align="center" justify="space-between" className="signupContainer">
          <Flex
            className="termsAndConditions"
            flexDirection="column"
            p="2rem"
          >
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Terms and Conditions
              </Text>
              <Text fontSize="sm" mt="1rem">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.

Nulla facilisi. Phasellus convallis, elit a ultricies ultricies, metus lectus ullamcorper libero, quis dictum mauris nisi id urna.

Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur aliquet quam id dui posuere blandit.By signing up, you agree to our Terms and Conditions. Please read them carefully.
              </Text>
            </Box>
            <Box mt="1rem">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label htmlFor="agree"> I agree to the Terms and Conditions</label>
            </Box>
          </Flex>
          <div className="signupDetail">
            <div>
              <h3>Signup</h3>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Set a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <div className="error">
                    {"* "}
                    {error}
                  </div>
                )}
                <p>
                  Already a User ? <Link to="/login">Login </Link>
                </p>
                <Button
                  isLoading={isLoading}
                  loadingText={"Signing Up"}
                  type="submit"
                  isDisabled={!agree}
                >
                  Submit
                </Button>
              </form>
            </div>
            <Text textAlign={"center"}>Or</Text>
            <Box>
              <Button my="3" width="100%" onClick={handleGoogle} isDisabled={!agree}>
                <Text as="span" mr={"1rem"}>
                  Signup with Google
                </Text>
                <FcGoogle fontSize={"1.4rem"} mx="1rem" />
              </Button>
            </Box>
          </div>
        </Flex>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
