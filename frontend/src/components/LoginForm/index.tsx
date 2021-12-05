import { FormEvent, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from 'interfaces/redux';
import { ModalChildProps } from 'interfaces/modal';
import { Button, TextField } from '@mui/material';

function LoginForm({ setShowModal }: ModalChildProps) {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state: State) => state.session.user);
    const [credential, setCredential] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Array<string>>([]);

    if (sessionUser) navigate('/');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.login({ credential, password }))
        .then(()=>setShowModal(false))
        .catch(async (res: any) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }

    return (
        <form onSubmit ={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
           
            <TextField
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />

        
            <TextField
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            
            <Button type="submit">Log In</Button>
        </form>
    );
}

export default LoginForm;
