const user = async (_source, { id }, { dataSources }) => {
  const user = await dataSources.userAPI.getUser(id);
  return { ...user, secondName: user.lastName, id: user._id };
};

const registerUser = async (_source, { firstName, secondName, password, email }, { dataSources }) => {
  const newUser = await dataSources.userAPI.registerUser({ firstName, lastName: secondName, password, email });
  return { ...newUser, id: newUser._id, secondName: newUser.lastName }
};

const jwt = async (_source, { email, password }, { dataSources }) => {
  return dataSources.userAPI.login({ email, password });
};

export { user, registerUser, jwt };
