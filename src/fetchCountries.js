export { fetchContries };

// export function fetchContries(name) {
//   const url = 'https://restcountries.com/v3.1/name/';
//   const parametrs = '?fields=name,capital,flags,languages,population';
//   const adress = `${url}${name}${parametrs}`;
//   return fetch(adress).then(responce => {
//     if (!responce.ok) {
//       throw new Error(responce.status);
//     }
//     return responce.json();
//   });
// }

async function fetchContries(name) {
  const url = 'https://restcountries.com/v3.1/name/';
  const parametrs = '?fields=name,capital,flags,languages,population';
  const adress = `${url}${name}${parametrs}`;
  try {
    const response = await fetch(adress);
    const country = response.json();
    console.log(country);
    return country;
  } catch (error) {
    console.log(error);
  }
}
