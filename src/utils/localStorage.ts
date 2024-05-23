// const setLocalStorage = (
//   key: string,
//   value: unknown,
//   expirationInMinutes: number,
// ) => {
//   const now = new Date();

//   const item = {
//     value: value,
//     expiry: now.getTime() + expirationInMinutes * 1000,
//   };

//   const setData = localStorage.setItem(key, JSON.stringify(item));

//   console.log(setData, 'data has been set');
// };

// const getLocalStorage = (key: string) => {
//   const data = localStorage.getItem(key);

//   if (!data) {
//     return;
//   }

//   const parsedData = JSON.parse(data);

//   console.log(parsedData, 'PARSED');
//   const now = new Date();

//   if (now.getTime() > parsedData.expiry) {
//     localStorage.removeItem(key);
//     return null;
//   }

//   return parsedData.value;
// };

// export { setLocalStorage, getLocalStorage };
