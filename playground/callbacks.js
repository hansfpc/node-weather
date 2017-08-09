let getUser = (id, callback) => {
  let user = { id, name: 'hans'};
  setTimeout( () => callback(user), 3000);
};

getUser(31, (userObject) => console.log(userObject) );
// Prints { id: 31, name: 'hans' }