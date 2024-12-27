import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Student } from '@/types/student';

interface Props {
    students: Student[];
    search: string;
    className: string;
    error?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { name, classId } = context.query;

        const nameValue = Array.isArray(name) ? name[0] : name;
        const classIdValue = Array.isArray(classId) ? classId[0] : classId;

        const params: { name?: string; schoolClassId?: string } = {};

        if (nameValue) params.name = nameValue;

        if (classIdValue) params.schoolClassId = classIdValue;

        console.log(params, 'param');

        const res = await axios.get('http://localhost:3000/api/students', {
            params,
            headers: {
                Authorization: `Bearer adminToken`,
            },
        });

        return {
            props: {
                students: res.data,
                search: name || '',
                className: classId || '',
            },
        };
    } catch (error) {
        let errorMessage = 'Failed to fetch students.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            props: {
                students: [],
                search: '',
                className: '',
                error: errorMessage,
            },
        };
    }
};

const StudentList: React.FC<Props> = ({ students, search, className, error }) => {
    const [searchInput, setSearchInput] = useState(search);
    const [classInput, setClassInput] = useState(className);
    const router = useRouter();

    // Tìm kiếm mà không cần debounce
    const handleSearch = () => {
        const queryParams: { name?: string; classId?: string } = {};

        if (searchInput) queryParams.name = searchInput;
        if (classInput) queryParams.classId = classInput;

        const queryString = new URLSearchParams(queryParams).toString();
        router.push(`/students?${queryString}`);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleClassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleRowClick = (studentId: number) => {
        router.push(`/students/${studentId}`);
    };

    useEffect(() => {
        setSearchInput(search);
        setClassInput(className);
    }, [search, className]);

    if (error) {
        return <div className='text-red-500'>{`Error: ${error}`}</div>;
    }

    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-4 text-gray-800'>Student List</h1>
            <div className='mb-4 flex space-x-4'>
                <input
                    type='text'
                    placeholder='Search by name'
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    className='w-full md:w-1/3 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                    type='text'
                    placeholder='Search by class'
                    value={classInput}
                    onChange={handleClassInputChange}
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
                            <th className='py-2 px-4 text-left border-b'>Name</th>
                            <th className='py-2 px-4 text-left border-b'>Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr
                                    key={student.id}
                                    className='hover:bg-gray-100 cursor-pointer'
                                    onClick={() => handleRowClick(Number(student.id))}
                                >
                                    <td className='py-2 px-4'>{student.name}</td>
                                    <td className='py-2 px-4'>{student.schoolClassId}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className='py-4 text-center text-gray-500'>
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
