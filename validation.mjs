const validateRealName = (userInfo) => {
  const regex = /^[A-Za-z'\-.\s]+$/;
  const obj = {};
  if (!userInfo.realName || userInfo.realName.trim() === '' || userInfo.realName.search(regex) === -1) {
    obj.realname_invalid = 'Please enter a valid name.';
  }
  return obj;
};

const validateUserName = (userInfo, type) => {
  const regex = /^[a-z0-9_]+$/;
  const obj = {};
  if (!userInfo.username || userInfo.username.trim === '') {
    if (type === 'login') {
      obj.username_invalid = 'Please enter a username.';
    } else {
      obj.username_invalid = 'Please enter a valid username.';
    }
  } else if (userInfo.username.length < 1 || userInfo.username.length > 30) {
    obj.username_invalid = 'Your username should only be 1 to 30 characters long.';
  } else if (userInfo.username.search(regex) === -1) {
    if (type === 'signup' || type === 'settings') {
      obj.username_invalid = 'Your username should only include numbers, lowercase alphabets, and/or underscores.';
    }
  }
  return obj;
};
const validatePassword = (userInfo, type) => {
  const obj = {};
  if (!userInfo.password || userInfo.password.trim === '') {
    if (type === 'login') {
      obj.password_invalid = 'Please type in your password.';
    }
  }

  if (!userInfo.password || userInfo.password.trim === '' || userInfo.password.length < 8) {
    if (type === 'signup') {
      obj.password_invalid = 'Please enter a valid password of at least 8 characters long.';
    }
  }
  return obj;
};

export const validateUserInfo = (userInfo) => ({
  ...userInfo,
  ...validateRealName(userInfo, 'signup'),
  ...validateUserName(userInfo, 'signup'),
  ...validatePassword(userInfo, 'signup'),
});

export const validateUserSettings = (userInfo) => ({
  ...userInfo,
  ...validateRealName(userInfo, 'settings'),
  ...validateUserName(userInfo, 'settings'),
});

export const validateLogin = (userInfo) => ({
  ...userInfo,
  ...validateUserName(userInfo, 'login'),
  ...validatePassword(userInfo, 'login'),
});
