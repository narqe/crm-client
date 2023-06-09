import React from 'react';
import Layout from '@components/layouts/Layout';
import CustomTable from '@components/shared/CustomTable';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@graphql/Queries/Product';
import { useTranslation } from 'react-i18next';
import NewEntityBtn from '@components/shared/Inputs/NewEntityBtn';

const Products = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    const { t } = useTranslation();

    return (
        <Layout title={ t('LAYOUT_TITLES.PRODUCTS') }>
            <NewEntityBtn link={'/admin/newproduct'} buttonLabel={'NEW_PRODUCT'} />
            <CustomTable data={data?.getAllProducts} ctx="Product" loading={loading} error={error} />
        </Layout>
    )
}

export default Products;