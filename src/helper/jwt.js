import jwt, { verify } from 'jsonwebtoken';

const secret = 'qwerty12345';

const payload = {
    id: 1,
    name: 'Axrorbek',
    role: 'student',
    sstudentId: 12210,
};
const expiresIn = { expiresIn: '2s' };
const token = jwt.sign(payload, secret, expiresIn);
console.log({ token });

function checkToken(token) {
    var decoded = verify(token, secret);
    console.log({ decoded });
}

setTimeout(() => {
    checkToken(token);
}, 5000);
