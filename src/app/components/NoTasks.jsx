import Image from 'next/image'
import React from 'react'

const NoTasks = () => {
  return (
    <div className='w-full col-span-5  flex items-center justify-center'>
        <Image src="/add-task.svg" alt="No tasks" width={300} height={300} />   
    </div>
  )
}

export default NoTasks