export function fetchContries(name) {
  const url = 'https://restcountries.com/v3.1/name/';
  const parametrs = '?fields=name,capital,flags,languages,population';
  const adress = `${url}${name}${parametrs}`;
  return fetch(adress).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}
