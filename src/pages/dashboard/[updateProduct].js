import DashboardLayouts from '@/components/Layouts/DashboardLayouts';
import { useParams } from 'next/navigation';
import React from 'react';

const updateProduct = () => {
    const {updateProduct} = useParams();
    console.log(updateProduct);
    return (
        <div>
            <p>{updateProduct}</p>
        </div>
    );
};

export default updateProduct;
updateProduct.getLayout = function getLayout(page) {
    return <DashboardLayouts>{page}</DashboardLayouts>;
  };