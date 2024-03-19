import React, { useState } from 'react'
import { ChatState } from '../Context/Chatprovider'
import { Box } from '@chakra-ui/react'
import { ChatBox, MyChats, SideDrawer } from '../components/miscellaneous'


const Chatpage = () => {
  const {user} = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div style={{width:"100%", backgroundColor: "#0d1317"}}>
      {user && <SideDrawer/>}
      <Box className='flex justify-between w-screen h-[93vh] p-3'>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} />}
      </Box>
   
    </div>
  )
}

export default Chatpage