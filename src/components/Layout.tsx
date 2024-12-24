import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='flex'>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className='flex-1 bg-gray-100 p-4'>{children}</div>
        </div>
    );
};

export default Layout;
