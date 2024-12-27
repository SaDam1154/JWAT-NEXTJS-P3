import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Class {
    id: string;
    schoolClassName: string;
}

interface Props {
    classes: Class[];
    search: string;
    error?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { search } = context.query;

        const searchValue = Array.isArray(search) ? search[0] : search;

        const params: { search?: string } = {};
        if (searchValue) params.search = searchValue;

        const res = await axios.get('http://localhost:3000/api/school-classes/', {
            params,
            headers: {
                Authorization: `Bearer adminToken`,
            },
        });

        console.log('tim', '');
        return {
            props: {
                classes: res.data,
                search: searchValue || '',
            },
        };
    } catch (error) {
        let errorMessage = 'Failed to fetch classes.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            props: {
                classes: [],
                search: '',
                error: errorMessage,
            },
        };
    }
};

const ClassList: React.FC<Props> = ({ classes, search, error }) => {
    const [searchInput, setSearchInput] = useState(search);
    const router = useRouter();

    const handleSearch = () => {
        const queryParams: { search?: string } = {};

        if (searchInput) queryParams.search = searchInput;

        const queryString = new URLSearchParams(queryParams).toString();
        router.push(`/classes?${queryString}`);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (error) {
        return <div className='text-red-500'>{`Error: ${error}`}</div>;
    }

    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-4 text-gray-800'>Class List</h1>
            <div className='mb-4 flex space-x-4'>
                <input
                    type='text'
                    placeholder='Search by class name'
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    className='w-full md:w-1/3 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button onClick={handleSearch} className='p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                    Search
                </button>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full table-auto'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 text-left border-b'>Class Name</th>
                            <th className='py-2 px-4 text-left border-b'>Class ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length > 0 ? (
                            classes.map((classItem) => (
                                <tr
                                    key={classItem.id}
                                    className='hover:bg-gray-100 cursor-pointer'
                                    onClick={() => router.push(`/classes/${classItem.id}`)}
                                >
                                    <td className='py-2 px-4'>{classItem.schoolClassName}</td>
                                    <td className='py-2 px-4'>{classItem.id}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className='py-4 text-center text-gray-500'>
                                    No classes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassList;
