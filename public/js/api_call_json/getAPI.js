 const getAPI = async (url) => {
  let result = await fetch(url);
  return await result.json();
}