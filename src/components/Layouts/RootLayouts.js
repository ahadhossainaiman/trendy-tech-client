import React from 'react';
import Navber from '../Ui/Navber';
import FooterSection from '../Ui/Footer';



const RootLayouts = ({children}) => {
    return (
        <div data-theme="light">
            <Navber />
            <main className='min-h-screen h-min-[100vh]'>
                {children}
            </main>
        <FooterSection/>
        </div>
    );
};

export default RootLayouts;