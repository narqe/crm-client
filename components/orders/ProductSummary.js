import React, { useContext, useEffect, useState } from 'react'
import OrderContext from '@context/orders/OrderContext';
import CurrencyNumber from '@components/shared/CurrencyNumber';
import { useTranslation } from 'react-i18next';

const ProductSummary = ({ product }) => {
    const orderContext = useContext(OrderContext);
    const { updateQty, updateTotal } = orderContext;
    const [ quantity, setQuantity ] = useState(1);
    const { t } = useTranslation();

    useEffect(() => {
        update();
        updateTotal();
    }, [quantity])

    const update = () => {
        const newProduct = {...product, quantity: Number(quantity) }
        updateQty(newProduct)
    }

    const { name, price } = product;

    return (
        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className='md:w-2/4 mb-2 md:mb-0'>
                <p className='text-sm'>{name}</p>
                <CurrencyNumber value={price} />
            </div>
            <input 
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type='number'
                placeholder={t('PLACEHOLDERS.QTY_ORDER')}
                value={quantity}
                min={0}
                onChange={(e) => setQuantity(e.target.value)}
            />
        </div>
    )
}

export default ProductSummary;
