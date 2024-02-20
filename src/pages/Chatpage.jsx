import React, { useState } from 'react'
import { ChatState } from '../Context/Chatprovider'
import { Box } from '@chakra-ui/react'
import { ChatBox, MyChats, SideDrawer } from '../components/miscellaneous'


const Chatpage = () => {
  const {user} = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div className="bg-[url('https://cdn2.f-cdn.com/contestentries/2046262/58571795/61f00c583e000_thumb900.jpg')]" style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box className='flex justify-between w-screen h-[93vh] p-3'>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} />}
      </Box>
   
    </div>
  )
}

export default Chatpage