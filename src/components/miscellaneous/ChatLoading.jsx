import { Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

const ChatLoading = ({ count }) => {
  const skeletons = [...Array(count)]; // Dynamically create skeleton elements

  return (
    <Stack>
      {skeletons.map((_, index) => (
        <Skeleton
          key={index} // Provide unique keys for React optimization
          height="40px"
          startColor="gray.700"
          endColor="gray.900"
          borderRadius="xl"
        />
      ))}
    </Stack>
  );
};

export default ChatLoading;