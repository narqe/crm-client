import React, { useState } from 'react'
import Layout from '../components/Layout'
import InputField from '../components/InputField'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NEW_PRODUCT } from '../GraphQL/Mutations';
import { GET_PRODUCTS } from '../GraphQL/Queries';
import useToaster from '../hooks/useToaster';
import SubmitBtn from '../components/SubmitBtn';
import Swal from 'sweetalert2';

const NewProduct = () => {
    const [ message, saveMessage ] = useState({
        message: '',
        type: ''
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre del producto es obligatorio'),
            price: Yup.string().required('El precio del producto es obligatorio'),
            quantity: Yup.string().required('La cantidad del producto es obligatoria'),
        }),
        onSubmit: async (values) => {
            const { name, price, quantity } = values;
            try {
                const { data } = await newProduct({
                    variables: {
                        input: {
                            name,
                            price,
                            quantity
                        }
                    }
                })
                Swal.fire({
                    title: `Exito!`,
                    text: `El producto ${name} fue creado correctamente`,
                    icon: 'success',
                    timer: 2000
                })
                values.name = ''
                values.price = ''
                values.quantity = ''
            } catch ({ message }) {
                saveMessage({
                    message: message.replace('GraphQL error:', ''),
                    type: 'error'
                })
            }
        }
    })
    const [ newProduct ] = useMutation(NEW_PRODUCT, {
        update( cache, { data: { newProduct } } ) {
            const { getAllProducts } = cache.readQuery({ query: GET_PRODUCTS });
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getAllProducts: [...getAllProducts, newProduct]
                }
            })
        }
    });

    return (
        <Layout title="New Product">
            { useToaster(message?.message, message?.type) }
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form 
                        onSubmit={formik.handleSubmit} 
                        className='bg-white shadow-md px-8 pt-8 pb-8 mb-4'>
                        { InputField('Nombre', 'text', 'Nombre del producto', 'name', formik) }
                        { InputField('Price', 'number', 'Precio del producto', 'price', formik) }
                        { InputField('Quantity', 'number', 'Cantidad disponible', 'quantity', formik) }
                        { SubmitBtn('Cargar Producto') }
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewProduct