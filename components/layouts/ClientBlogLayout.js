import React from 'react';
import Head from 'next/head';
import Separator from '@components/shared/Structure/Separator';
import Metadata from '@components/blog/Metadata';
import SocialShareToolbar from '@components/shared/SocialShareToolbar';
import NavMenu from '@components/shared/Structure/NavMenu';
import useCoverPhoto from '@hooks/useCoverPhoto'

const ClientBlogLayout = ({ children, title, author, createdOn, url, content }) => {
    const { coverPhoto } = useCoverPhoto(content)

    return (
        <>
            <Head>
                <title>Narcotica | El vicio es cultura</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" referrerPolicy="no-referrer" /> 
            </Head>
            <div className="bg-gray-100 min-h-screen">
                <div className="flex-col min-h-screen">
                    <NavMenu />
                    <main className="w-full sm:min-h-screen relative">
                        { coverPhoto && !coverPhoto.includes('icon-no-image.svg') && 
                            <div className='w-full h-48 lg:h-96 opacity-30 top-0 left-0'>
                                <img
                                    className="h-52 w-full object-cover lg:h-full lg:w-full"
                                    src={coverPhoto} 
                                    height={100} 
                                    width={100}
                                />
                            </div>
                        }
                        <h1 className="md:text-2xl px-10 py-2 mt-5 font-light sm:text-md">
                            { title }
                        </h1>
                        <div className='md:flex sm:inline-flex px-5 items-center justify-between'>
                            <Metadata createdOn={createdOn} author={author} />
                            <SocialShareToolbar
                                styles="px-5 py-2 flex md:justify-end cursor-pointer gap-2" 
                                url={url} 
                                size={24} 
                            />
                        </div>
                        <Separator size={1} />
                        <div className='px-10 pt-5 relative'>
                            { children }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default ClientBlogLayout;