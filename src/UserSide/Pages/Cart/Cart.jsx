import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, addToCart } from '../../../Redux/Cart/cart.actions'
import { useNavigate } from 'react-router-dom'
import { MdMoreTime } from 'react-icons/md'
import gift from './gift.png'
import { BsTag } from 'react-icons/bs'

const Cart = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()

  const userData = useSelector((store) => store.userAuthReducer.user)
  const id = userData?.uid

  const data = useSelector((store) => store.cartReducer.cart)

  useEffect(() => {
    if (id) {
      dispatch(getCart(id))
    }
  }, [dispatch, id])

  // Delete logic
  const handleDelete = (item) => {
    const updatedCart = data.filter((cartItem) => cartItem.id !== item.id)
    dispatch(addToCart(id, updatedCart))
    toast({
      title: 'Item removed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleChangeQtt = (prodId, qtt) => {
    let newData = data.map((item) => {
      if (item.id === prodId) {
        return { ...item, qtt: qtt }
      }
      return item
    })
    dispatch(addToCart(id, newData))
  }

  const cartQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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
                  <Image h={'100px'} src={el.images[0]} />

                  <Box>
                    <Text>{el.brand}</Text>
                    <p style={{ fontSize: '12px' }}>{el.title}</p>
                    <Flex gap={2}>
                      <Select
                        w={'80px'}
                        style={{ fontSize: '12px' }}
                        h={'20px'}
                        borderRadius={'0%'}
                        placeholder='size'
                      >
                        {el?.size?.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </Select>
                      <Select
                        w={'80px'}
                        h={'20px'}
                        style={{ fontSize: '12px' }}
                        onChange={(e) =>
                          handleChangeQtt(el.id, +e.target.value)
                        }
                        borderRadius={'0%'}
                        placeholder='Quantity'
                      >
                        {cartQuantity?.map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </Select>
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
                      <p style={{ fontSize: '10px' }}>
                        {' '}
                        14 Days return Available
                      </p>
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
                {data.reduce(
                  (acc, curr) => acc + curr.originalPrice * curr.qtt,
                  0
                )}
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
                  (acc, curr) =>
                    acc + (curr.originalPrice - curr.offerPrice) * curr.qtt,
                  0
                )}
              </p>
            </Flex>
            <Flex justifyContent={'space-between'} mt={2}>
              <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Total Amount
              </p>
              <p
                style={{
                  fontSize: '12px',
                  padding: '10px',
                  marginLeft: '120px',
                  fontWeight: 'bold',
                }}
              >
                Rs.{' '}
                {data.reduce(
                  (acc, curr) => acc + curr.offerPrice * curr.qtt,
                  0
                )}
              </p>
            </Flex>
            <Button
              width={['100%', '80%']}
              borderRadius={'0%'}
              color={'white'}
              isDisabled={data.length === 0}
              backgroundColor={'#ef506a'}
              onClick={() => navigate('/payment')}
            >
              Place Order
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </div>
  )
}

export default Cart
