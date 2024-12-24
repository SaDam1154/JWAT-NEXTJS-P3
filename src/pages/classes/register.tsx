import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterClass: React.FC = () => {
    console.log('render class create');

    const [classId, setClassId] = useState('');
    const [className, setClassName] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            // Gọi API để đăng ký lớp học với cả id và name
            await axios.post(
                'http://localhost:3000/api/classes',
                {
                    className,
                    id: classId,
                },
                {
                    headers: {
                        Authorization: `Bearer admin`,
                    },
                }
            );
            router.push('/classes');
        } catch (error) {
            console.error('Failed to register class', error);
        }
    };

    return (
        <div>
            <h1>Register New Class</h1>
            <div>
                <label htmlFor='classId'>Class ID:</label>
                <input type='text' id='classId' placeholder='Enter class ID' value={classId} onChange={(e) => setClassId(e.target.value)} />
            </div>
            <div>
                <label htmlFor='className'>Class Name:</label>
                <input
                    type='text'
                    id='className'
                    placeholder='Enter class name'
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterClass;
