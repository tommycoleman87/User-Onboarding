import React, { useEffect } from 'react';
import  axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import {Div, UserDiv } from './styledComponents';
const UserForm = ({errors, touched, values, status, user, setUser}) => {
 

    useEffect(() => {
        if(status) {
            setUser([...user, status])
            console.log(status)
        }
    }, [status])

    return (
        <div>
            <h1>User Sign Up</h1>
            <Form>
                <Div>
                <Field type='text' name='name' placeholder='Name' />
                {touched.name && errors.name &&(
                    <p>{errors.name}</p>
                )}
                <Field type='text' name='eMail' placeholder='E-Mail' />
                {touched.eMail && errors.eMail &&(
                    <p>{errors.eMail}</p>
                )}
                <Field type='password' name='password' placeholder='Password' />
                {touched.password && errors.password &&(
                    <p>{errors.password}</p>
                )}
                <Field component='select' name='role'>
                    <option>Please Choose a Role</option>
                    <option value='user'>User</option>
                    <option value='guest'>Guest</option>
                </Field>
                <label>I Agree to the Terms and Conditions</label>
                <Field type='checkbox' name='terms' checked={values.terms} />
                {touched.terms && errors.terms &&(
                    <p>{errors.terms}</p>
                )}
                <button type='submit'>Sign Up</button>
                </Div>
            </Form>
            <h1>Users</h1>
            <UserDiv>
            {user.map(user => {
               return <p key={user.id}>{user.name}<br />{user.role}</p>
            })}
            </UserDiv>
        </div>
    )
}



const FormikUserForm = withFormik({
    mapPropsToValues({name, eMail, password, terms, role}) {
        return {
            name: name || '',
            terms: terms || false,
            eMail: eMail || '',
            password: password || '',
            role: role || '',
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Please input your name'),
        eMail: Yup.string().email('Valid E-Mail Required').test( 'waffleTest',
        'E-Mail already exists',
        value => value !== 'waffle@syrup.com').required('Valid E-Mail Required'),
        password: Yup.string().required().min(6, 'Password Too Short'),
        role: Yup.string().required('Please select a Role'),
        terms: Yup.bool().oneOf([true], "Please agree to the terms of service")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log(values.eMail)
        axios
            .post('https://reqres.in/api/users.', values)
            .then(res => {
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err))
            
    }
})(UserForm);

export default FormikUserForm;