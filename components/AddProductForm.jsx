"use client";

import React, { useState } from 'react'
import { Input } from './ui/input'

const AddProductForm = ({user}) => {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {};

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-2xl mx-auto '>
      <div className='flex flex-col sm:flex-row gap-2'>
        <Input 
          type={"url"} 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter product URL (Amazon, Flipkart, etc.)" 
          className={"h-12 text-base"} 
          required
          disabled={loading}
        />
      </div>
    </form>
  )
}

export default AddProductForm