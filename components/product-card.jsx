"use client"

import { deleteProduct } from '@/app/actions';
import { useState } from 'react'
import { toast } from 'sonner';
import { Card, CardHeader } from './ui/card';
import Image from 'next/image';

const ProductCard = ({product}) => {
    const [showChart, setShowChart] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        setDeleting(true);
        const result = await deleteProduct(product.id);
        
        if (result.error) {
            toast.error(result.error);
        } else{
            toast.success(result.message ||"Product deleted successfully");
            setUrl("");
        }

        setDeleting(false);
    };

  return (
    <Card className={"hover:shadow-lg transition-shadow"}>
        <CardHeader className={"pb-3"}>
            <div className='flex gap-4'>
                {product.image_url && (
                    <img src={product.image_url} alt={product.name} className='w-20 h-20 object-cover rounded-md border' />
                )}

                <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-gray-900 dark:text-neutral-200 line-clamp-2 mb-2'>{product.name}</h3>
                </div>
            </div>
        </CardHeader>
    </Card>
  )
}

export default ProductCard