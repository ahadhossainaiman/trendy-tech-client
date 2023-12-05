import RootLayouts from '@/components/Layouts/RootLayouts';
import React from 'react';

const ProductsPage = () => {
    return (
        <div>
            <h1>Products</h1>
        </div>
    );
};

export default ProductsPage;
ProductsPage.getLayout = function getLayout(page) {
    return <RootLayouts>{page}</RootLayouts>;
  };