const bcrypt = require('bcryptjs');

export const encrypt = async function encrypt(text: string): Promise<string> {
    return await bcrypt.hash(text, 12);
}

export const verifyEncryption = async function verifyEncryption(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
}
