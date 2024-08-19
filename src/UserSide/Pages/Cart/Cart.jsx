import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, addToCart } from '../../../Redux/Cart/cart.actions';
import { useNavigate } from 'react-router-dom';
import { MdMoreTime } from 'react-icons/md';

const Cart = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.userAuthReducer.user);
  const id = userData?.uid;

  const data = useSelector((store) => store.cartReducer.cart);

  useEffect(() => {
    if (id) {
      dispatch(getCart(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log('Cart data:', data); // Debugging line
  }, [data]);

  const handleDelete = (item) => {
    const updatedCart = data.filter((cartItem) => cartItem.id !== item.id);
    dispatch(addToCart(id, updatedCart));
    toast({
      title: 'Item removed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleChangeQtt = (prodId, change) => {
    let newData = data.map((item) => {
      if (item.id === prodId) {
        const newQtt = item.qtt + change;
        if (newQtt > 0) {
          return { ...item, qtt: newQtt };
        } else {
          handleDelete(item);
          return null;
        }
      }
      return item;
    }).filter(Boolean);
    dispatch(addToCart(id, newData));
  };

  const handlePlaceOrder = () => {
    dispatch(addToCart(id, [])); // Example: Clearing cart
    toast({
      title: 'Order placed.',
      description: 'Thank you for shopping!!!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose(); // Close the dialog after placing the order
  };

  if (!data || data.length === 0) {
    return <Text>No items in the cart.</Text>;
  }

  return (
    <div>
      <Grid className='cart_grid' m='5' gap={4}>
        <GridItem width={'100%'}>
          <Grid gap={2} mt={'10px'}>
            {data?.map((el) => (
              <Flex
                key={el.id}
                justifyContent={'space-between'}
                boxShadow={
                  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
                }
                padding={2}
              >
                <Flex gap={2}>
                  <Image h={'100px'} src={el.images[0]} alt={el.title} />
                  <Box>
                    <Text>{el.brand}</Text>
                    <p style={{ fontSize: '12px' }}>{el.title}</p>
                    <Flex gap={2} alignItems="center">
                      <Text>Size: {el.size}</Text>
                    </Flex>
                    <Flex alignItems="center" gap={2}>
                      <Button
                        size="xs"
                        onClick={() => handleChangeQtt(el.id, -1)}
                      >
                        -
                      </Button>
                      <Text>{el.qtt}</Text>
                      <Button
                        size="xs"
                        onClick={() => handleChangeQtt(el.id, 1)}
                      >
                        +
                      </Button>
                    </Flex>
                    <Flex py='0.4rem'>
                      <Text fontSize={'0.9rem'} pr={'0.5rem'}>
                        ₹{el.offerPrice}
                      </Text>
                      <Text
                        textDecoration={'line-through'}
                        fontSize={'0.9rem'}
                        color='gray.400'
                      >
                        ₹{el.originalPrice}
                      </Text>
                    </Flex>
                    <Flex>
                      <MdMoreTime />{' '}
                      <p style={{ fontSize: '10px' }}> 14 Days return Available</p>
                    </Flex>
                  </Box>
                </Flex>
                <Button
                  backgroundColor={'#ffffff'}
                  onClick={() => handleDelete(el)}
                >
                  x
                </Button>
              </Flex>
            ))}
          </Grid>
        </GridItem>
        <GridItem width={'100%'}>
          <Box padding={15}>
            <h1 style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Price Details ({data.length}-items)
            </h1>
            <Flex justifyContent={'space-between'} mt={2}>
              <p style={{ fontSize: '12px' }}>Total MRP</p>
              <p
                style={{
                  fontSize: '12px',
                  padding: '10px',
                  marginLeft: '150px',
                }}
              >
                Rs.{' '}
                {data.reduce((acc, curr) => acc + curr.originalPrice * curr.qtt, 0)}
              </p>
            </Flex>
            <Flex justifyContent={'space-between'} mt={2}>
              <p style={{ fontSize: '12px' }}>Discount on MRP</p>
              <p
                style={{
                  fontSize: '12px',
                  padding: '10px',
                  marginLeft: '120px',
                }}
              >
                Rs.{' '}
                {data.reduce(
                  (acc, curr) => acc + (curr.originalPrice - curr.offerPrice) * curr.qtt,
                  0
                )}
              </p>
            </Flex>
            <Flex justifyContent={'space-between'} mt={2}>
              <p style={{ fontSize: '12px', fontWeight: 'bold' }}>Total Amount</p>
              <p
                style={{
                  fontSize: '12px',
                  padding: '10px',
                  marginLeft: '120px',
                  fontWeight: 'bold',
                }}
              >
                Rs.{' '}
                {data.reduce((acc, curr) => acc + curr.offerPrice * curr.qtt, 0)}
              </p>
            </Flex>
            <Button
              width={['100%', '80%']}
              borderRadius={'0%'}
              color={'white'}
              isDisabled={data.length === 0}
              backgroundColor={'#ef506a'}
              onClick={onOpen} // Open the dialog on button click
            >
              Place Order
            </Button>
          </Box>
        </GridItem>
      </Grid>

      {/* AlertDialog for showing the order placed message */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Order Placed
            </AlertDialogHeader>

            <AlertDialogBody>
              Thank you for shopping!!!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default Cart;
