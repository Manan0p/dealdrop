"use client";

import React, { useState } from 'react'
import { Input } from './ui/input'

const AddProductForm = ({user}) => {

  const [url, setUrl] = useState("");

  return (
    <form>
      <div className='flex flex-col sm:flex-row gap-2'>
        <Input type={"url"} value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
    </form>
  )
}

export default AddProductForm