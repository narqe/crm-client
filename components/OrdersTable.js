import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { CiCircleRemove } from 'react-icons/ci';
import { IoMdPhonePortrait } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { DELETE_ORDER, UPDATE_ORDER } from '../GraphQL/Mutations';
import Swal from 'sweetalert2';
import { GET_ORDERS_BY_SELLER } from '../GraphQL/Queries';

const OrdersTable = ({ order }) => {
    const { id, total, client: { name, lastname, email, phone }, state, client } = order;

    const [statusOrder, setStatusOrder] = useState(state);
    const [className, setClassName] = useState('');
    const [ updateOrder ] = useMutation(UPDATE_ORDER);
    const [ deleteOrder ] = useMutation(DELETE_ORDER, {
        update( cache ) {
            const { getOrderVendedor } = cache.readQuery({ query: GET_ORDERS_BY_SELLER });
            cache.writeQuery({
                query: GET_ORDERS_BY_SELLER,
                data: {
                    getOrderVendedor: getOrderVendedor.filter(orders => orders.id !== id)
                }
            })
        }
    });

    useEffect(() => {
        if(statusOrder) {
            setStatusOrder(statusOrder)
        }
        orderClass()
    }, [ statusOrder ])

    const updateOrderStatus = async newStatus => {
        try {
            const { data } = await updateOrder({
                variables: {
                    id, 
                    input: {
                        state: newStatus,
                        client: client.id
                    }
                }
            })
            setStatusOrder(data.updateOrder.state)
        } catch ({ message }) {
            console.log(message);
        }
    }

    const orderClass = () => {
        if (statusOrder === "PENDING") {
            setClassName('border-yellow-500 bg-yellow-50')
        } else if(statusOrder === "COMPLETED") {
            setClassName('border-green-500 bg-green-50')
        } else {
            setClassName('border-red-800 bg-red-50 opacity-50')
        }
    }

    const confirmDeleteOrder = () => {
        Swal.fire({
            title: `¿Está seguro que desea eliminar este pedido?`,
            text: "Esta acción no puede deshacerse",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const { data } = await deleteOrder({
                    variables: { id }
                })
                Swal.fire(data.deleteOrder, `El pedido fue eliminado correctamente`,'success')
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    return (
        <div className={`${className} border-t-4 my-5 rounded p-5 md:grid md:grid-cols-2 gap-2 shadow-lg`}>
            <div className="mt-1">
                <div className='font-bold text-gray-800 flex items-center my-1'>
                    <span>Client: </span>
                    <span className='mx-2 font-light'>{`${name} ${lastname}`}</span>
                </div>
                <p className='font-bold text-sm text-gray-600 flex items-center mt-4'>
                    <MdEmail />
                    <span className='mx-2 font-light'>{`${email}`}</span>
                </p>
                <p className='font-bold text-sm text-gray-600 flex items-center my-1'>
                    <IoMdPhonePortrait /> 
                    <span className='mx-2 font-light'>{`${phone || '-'}`}</span>
                </p>
                <select 
                    value={statusOrder}
                    onChange={e => updateOrderStatus(e.target.value)}
                    className='flex mt-4 appearence-none bg-blue-600 border-blue-600 text-white py-2 px-4 rounded text-center leading-light focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'>
                        <option value='COMPLETED'>Status: COMPLETED</option>
                        <option value='PENDING'>Status: PENDING</option>
                        <option value='CANCELLED'>Status: CANCELLED</option>
                </select>
            </div>
            <div>
                <h2 className='text-gray-800 font-bold mt-1'>Order Summary</h2>
                { order.order.map(item => (
                    <div key={item.id} className='mt-4'>
                        <p className='text-sm text-gray-600'>Product: { item.name }</p>
                        <p className='text-sm text-gray-600'>Qty: { item.quantity } ud.</p>
                    </div>
                ))}
                <p className='mt-3 font-bold text-gray-800'>
                    Total: <span>${total} ARS</span>
                </p>
                <button 
                    onClick={() => confirmDeleteOrder()}
                    className='flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded uppercase text-xs font-bold'>
                    Eliminar Pedido 
                    <CiCircleRemove className='ml-2' />
                </button>
            </div>
        </div>
    )
}

export default OrdersTable;