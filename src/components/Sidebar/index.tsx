import GroupMenu from './GroupMenu';

const groupMenus = [
    {
        main: {
            iconClassname: 'fa-solid fa-house',
            text: 'Trang chủ',
            link: '/',
        },
    },
    {
        main: {
            iconClassname: 'fa-solid fa-users',
            text: 'Quản lý học sinh',
            link: '/students',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách học sinh',
                link: '/students',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm học sinh',
                link: '/students/register',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-school',
            text: 'Quản lý lớp học',
            link: '/classes',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách lớp học',
                link: '/classes',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm lớp học',
                link: '/classes/register',
            },
        ],
    },
];

const Sidebar: React.FC = () => {
    console.log('render Sidebar');
    return (
        <div className='h-full min-w-[240px] bg-blue-500'>
            <header className='flex h-20 w-full flex-col items-center justify-center border-b border-white/40 text-white'>
                <div className='text-lg font-bold'>QUẢN LÝ</div>
                <div className='font-semibold'>HỌC SINH</div>
            </header>

            <div className='overflow-y-auto h-[calc(100vh-80px)]'>
                <ul className='flex h-full flex-col space-y-0.5 p-2 gap-1'>
                    {groupMenus.map((groupMenu, index) => (
                        <GroupMenu key={index} groupMenu={groupMenu} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
