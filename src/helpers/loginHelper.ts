export const generateCodesPKCE = async (): Promise<any> => {
  // Funcion de debug
  // const format = (x) => ( y = [], x.forEach((i) => y.push(i.toString(16).padStart(2, '0') )), y.join(' ') );
  // Se genera codigo aleatorio
  const codeVerifierRaw: any = new Uint8Array(80).map((a) =>
    Math.floor(Math.random() * 256)
  );

  // console.log("Code Verifier Raw:", format(codeVerifierRaw));
  // Transformacion de bytes a base64url (RFC 4648)
  const codeVerifier = btoa(String.fromCharCode.apply(null, codeVerifierRaw))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  // Hash SHA-256 al codigo verificador
  const codeChallengeCrypt = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );

  // Transformacion de bytes a base64url (RFC 4648)
  const base64urlValue: any = new Uint8Array(codeChallengeCrypt);
  const codeChallenge = btoa(String.fromCharCode.apply(null, base64urlValue))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return { codeVerifier, codeChallenge };
};
