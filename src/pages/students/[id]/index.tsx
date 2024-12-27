import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { Student } from '@/types/student';

interface Props {
    student: Student;
    error?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    console.log('render student id');

    try {
        const res = await axios.get('http://localhost:3000/api/students');
        const students: Student[] = res.data;

        const paths = students.map((student) => ({
            params: { id: student.id.toString() },
        }));

        return {
            paths,
            fallback: 'blocking',
        };
    } catch (error) {
        console.error('Error fetching student paths:', error);
        return {
            paths: [],
            fallback: 'blocking',
        };
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!;

    try {
        const res = await axios.get(`http://localhost:3000/api/students/${id}`, {
            headers: {
                Authorization: `Bearer adminToken`,
            },
        });

        return {
            props: {
                student: res.data,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error('Error fetching student details:', error);
        return {
            props: {
                error: 'Failed to fetch student details',
            },
        };
    }
};

const StudentDetail: React.FC<Props> = ({ student, error }) => {
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Student Detail</h1>
            <p>ID: {student.id}</p>
            <p>Name: {student.name}</p>
            <p>Class: {student.schoolClassId}</p>
        </div>
    );
};

export default StudentDetail;
