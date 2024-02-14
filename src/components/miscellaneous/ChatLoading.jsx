import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
   <Stack>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
        <Skeleton height={"40px"} startColor='gray.700' endColor='gray.900' borderRadius={"xl"}/>
   </Stack>
  )
}

export default ChatLoading