import { useState } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import Link from 'next/link';
import { unauthPage } from "../../middleware/authrizationPage";

export async function getServerSideProps(context) {
    await unauthPage(context);

    return {props: {}}
}

export default function index() {
    const [fields, setfields] = useState({email: '', password: ''})
    const [status, setstatus] = useState('')

    const fieldsHandler = e => {
        const name = e.target.getAttribute('name');
        setfields({
            ...fields,
            [name]: e.target.value
        });
    }

    const loginHandler = async e => {
        e.preventDefault();
        setstatus('loading...')
        const loginReq = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        if(!loginReq.ok) return setstatus(`${loginReq.status} ${loginReq.statusText}`)
        const loginRes = await loginReq.json()
        Cookie.set('token', loginRes.token)
        setstatus('success, redirecting...')
        Router.push('/posts')
    }

    return (
        <div className="main">
            <h1 className="title">Login Page</h1>
            <form onSubmit={loginHandler} style={{width: '95%'}}>
                <input type='email' name='email' onChange={fieldsHandler} placeholder='Email' /><br />
                <input type='password' name='password' onChange={fieldsHandler} placeholder='Password' /><br />
                <button type='submit'>Login</button>
            </form>
            <p>Don't have account ? <Link href="/register">Register Here</Link></p>
            <p>{status}</p>
        </div>
    )
}
