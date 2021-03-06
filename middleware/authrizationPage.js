import cookies from 'next-cookies';

export function unauthPage(context) {
    return new Promise(resolve => {
        const cookie = cookies(context);
    
        if (cookie.token) {
            context.res.writeHead(302, {
                location: '/post'
            }).end();
        }
        return resolve('unauthorized')
    })
}
export function authPage(context) {
    return new Promise(resolve => {
        const cookie = cookies(context);
    
        if (!cookie.token) {
            context.res.writeHead(302, {
                location: '/login'
            }).end();
        }
        return resolve({
            token: cookie.token
        });
    })
}