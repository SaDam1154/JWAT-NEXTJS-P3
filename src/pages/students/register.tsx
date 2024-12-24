import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterStudent: React.FC = () => {
    console.log('render student create');

    const [name, setName] = useState('');
    const [classId, setClassId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(
                'http://localhost:3000/api/students',
                {
                    name,
                    classId,
                },
                {
                    headers: {
                        Authorization: `Bearer admin`,
                    },
                }
            );

            if (res.status === 201) {
                router.push('/students');
            }
        } catch (err) {
            setError('Đã có lỗi xảy ra khi đăng ký học sinh.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Đăng Ký Học Sinh</h1>
            {error && <div className='text-red-500'>{error}</div>}
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor='name'>Tên Học Sinh:</label>
                    <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor='classId'>Lớp:</label>
                    <input type='text' id='classId' value={classId} onChange={(e) => setClassId(e.target.value)} required />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Đang Đăng Ký...' : 'Đăng Ký'}
                </button>
            </form>
        </div>
    );
};

export default RegisterStudent;
