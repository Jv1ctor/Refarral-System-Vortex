
export const genCode = (length = 12) => {
 const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const indice = Math.floor(Math.random() * chars.length);
    code += chars[indice];
  }

  return code;
} 
