export function generateCodeVerifier() {
    // Increase the size of the array to generate a longer string
    const array = new Uint8Array(64); // 64 bytes = 512 bits
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
}


export function generateCodeChallenge(codeVerifier) {
    return codeVerifier; // For PKCE with the plain method, this is the same as the code verifier
}
