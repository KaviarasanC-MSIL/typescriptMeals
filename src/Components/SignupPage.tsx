import React, { useState } from 'react';
import './AuthPage.css';
import {FormDatas,Errors} from '../type'

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState<FormDatas>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        status: 'inactive'
    });
    const [errors, setErrors] = useState<Errors>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted"); 
        const storedUsers = localStorage.getItem('user');
        console.log("fetchdata: "+storedUsers); 
        const users: FormDatas[] = storedUsers ? JSON.parse(storedUsers) : [];
        console.log("Json fetchdata: "+users); 
        const existingUser = users.find(user => user.email === formData.email);

        if (existingUser) {
            setErrors({ ...errors, email: 'Email already exists' });
            return;
        }
try{
    const newErrors: any = { };
    if (formData.username.trim() === '') {
        newErrors.username = 'Username is required';
        console.log("'Username"+newErrors.username)
    }
    if (!formData.email.includes('@')) {
        newErrors.email = 'Invalid email';
        console.log("'email"+newErrors.email)
    }
    if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
        console.log("'Password"+newErrors.password)
    }
    if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
        console.log("'confirmPassword"+newErrors.confirmPassword)
    }
    if (Object.keys(newErrors).length > 0) { 
        console.log("'confirmnewErrors"+newErrors)
        setErrors(newErrors);
        return;
    } 
    const newUser: FormDatas = { ...formData }; 
    users.push(newUser);
    console.log(users)
    localStorage.setItem('user', JSON.stringify(users));

    alert("Signup successful");
    console.log('User signed up successfully:', formData.username);
}catch (error) {
    console.error('Error saving data', error);
}
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
