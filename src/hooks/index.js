import dotenv from 'dotenv';
dotenv.config();

const SRV_HOST = process.env.SRV_HOST || 'localhost';
const SRV_PORT = process.env.SRV_PORT || 3000;

const SRV_URL = `http://${SRV_HOST}:${SRV_PORT}/`;

export async function handle({ event, resolve }) {

    const request = event.request;

    console.log('-------- HANDLE HOOK | ' + event.request.method + ' ' +event.request.url + ' ----------');

    const body = request.body && await request.json();
    console.log(body || 'no request body');

    if (event.url.pathname.startsWith('/srv')) {
        console.log('SRV API');
        const endpoint = SRV_URL + event.url.pathname.slice(4);
        const headers = new Headers(request.headers);

        const init = {
            method: request.method,
            headers
        };

        if (body) {
            headers.set('Content-Type', 'application/json');
            init.body = JSON.stringify(body);
        }

        const response = await fetch(endpoint, init);
        console.log(request.method + ' ' + event.url.pathname + ' => ' + response.status);
        const responseBody = response.ok && response.body && await response.json();
        console.log(responseBody || 'no response body');
        return new Response(responseBody && JSON.stringify(responseBody) || null);
    }

    return await resolve(event);
}