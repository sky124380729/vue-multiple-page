// enc加密解密

import CryptoJS from 'crypto-js'

// 秘钥
const key = CryptoJS.enc.Utf8.parse('4FS1F3DA')
// 偏移量
const iv = CryptoJS.enc.Utf8.parse('5A6D3EEB')

//解密方法
export const Decrypt = word => {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

//加密方法
export const Encrypt = word => {
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.ciphertext.toString().toUpperCase()
}
