import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx'; // Import clsx

interface ChildMenu {
    iconClassname: string;
    text: string;
    link: string;
}

interface GroupMenuProps {
    groupMenu: {
        main: {
            iconClassname: string;
            text: string;
            link: string;
        };
        children?: ChildMenu[];
    };
}

const GroupMenu: React.FC<GroupMenuProps> = ({ groupMenu }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className='mb-2 items-center'>
            <div
                onClick={toggleMenu}
                className='flex justify-between items-center space-x-2 py-1 px-4 text-white cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-200'
            >
                <div className='flex gap-2 items-center justify-between'>
                    <i className={groupMenu.main.iconClassname}></i>
                    <span>{groupMenu.main.text}</span>
                </div>
                {groupMenu.children && (
                    <span className={clsx('transition', { 'rotate-90': isOpen })}>
                        <i className='fa-solid fa-chevron-right'></i>
                    </span>
                )}
            </div>
            {isOpen && groupMenu.children && (
                <ul className='pl-6'>
                    {groupMenu.children.map((child, index) => (
                        <li key={index} className='mb-1'>
                            <Link
                                href={child.link}
                                className='flex items-center space-x-2 p-2 text-white hover:bg-blue-600 hover:text-white transition-all duration-200'
                            >
                                <i className={child.iconClassname}></i>
                                <span>{child.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default GroupMenu;
