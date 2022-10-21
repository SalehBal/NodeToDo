function callApi(path, method, body, sucess, fail) {
  fetch('' + path, {
    // headers: {
    //   Authorization: 'Basic SGVsbG8gdGhlcmUgOikgSGF2ZSBhIGdvb2QgZGF5IQ==',
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(body),
  });
}
export default callApi;
