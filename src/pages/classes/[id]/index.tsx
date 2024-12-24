import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { Class } from '@/types/class';

interface Props {
    classProps: Class;
    error?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    console.log('render class id');

    try {
        const res = await axios.get('http://localhost:3000/api/classes');
        const classes: Class[] = res.data;

        const paths = classes.map((cls) => ({
            params: { id: cls.id.toString() },
        }));

        return {
            paths,
            fallback: 'blocking',
        };
    } catch (error) {
        console.error('Error fetching class paths:', error);
        return {
            paths: [],
            fallback: 'blocking',
        };
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!;

    try {
        const res = await axios.get(`http://localhost:3000/api/classes/${id}`, {
            headers: {
                Authorization: `Bearer admin`,
            },
        });

        return {
            props: {
                classProps: res.data, // Đảm bảo rằng props là classProps
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error('Error fetching class details:', error);
        return {
            props: {
                error: 'Failed to fetch class details',
            },
        };
    }
};

const ClassDetail: React.FC<Props> = ({ classProps, error }) => {
    // Đổi tên component thành ClassDetail
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Class Detail</h1> {/* Thay đổi tiêu đề thành "Class Detail" */}
            <p>ID: {classProps.id}</p>
            <p>Name: {classProps.className}</p>
        </div>
    );
};

export default ClassDetail; // Đảm bảo xuất component đúng
