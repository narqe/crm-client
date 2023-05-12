import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { NEW_ACCOUNT } from '../GraphQL/Mutations' 

const NewAccount = () => {
    const [ newUser ] = useMutation(NEW_ACCOUNT);
    const [ message, saveMessage ] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            lastname: Yup.string().required('Last is required'),
            email: Yup.string().email('Email is not valid').required('Email is required'),
            password: Yup.string().min(6, 'Password must have at least 6 characters').required('Password is required'),
        }),
        onSubmit: async values => {
            const { name, lastname, password, email } = values
            try {
                const { data } = await newUser({
                    variables: {
                        input: {
                            name,
                            lastname, 
                            password, 
                            email
                        }
                    }
                })                
                saveMessage({
                    message: `${ data.newUser.email } was created sucessfully`,
                    type: 'info'
                });
                setTimeout(() => router.push('/login'), 2000);

            } catch ({ message }) {
                saveMessage({
                    message: message.replace('GraphQL error:', ''),
                    type: 'error'
                })
                setTimeout(() => saveMessage(null), 2000);
            }
        }
    })

    return (
        <>
            <Layout>
                <h1 className="text-2xl text-white font-light text-center">Crear nueva cuenta</h1>
                
                { Toaster(message?.message, message?.type) }

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form 
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            { InputField('Nombre', 'text', 'Nombre del usuario', 'name', formik) }
                            { InputField('Apellido', 'text', 'Apellido del usuario', 'lastname', formik) }
                            { InputField('Email', 'email', 'Email del usuario', 'email', formik) }
                            { InputField('Password', 'password', 'Password del usuario', 'password', formik) }
                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="Iniciar Sesión"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default NewAccount;