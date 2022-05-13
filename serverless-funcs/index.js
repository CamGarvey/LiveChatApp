const { default: axios } = require('axios');

/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
 */
exports.onExecutePreUserRegistration = async (event, api) => {
  try {
    const response = await axios.post(
      'https://fb11-222-153-101-239.ngrok.io/auth/create-user-hook',
      {
        name: event.user.name,
        email: event.user.email,
        secret: event.secrets.AUTH0_HOOK_SECRET,
      }
    );
    if (!response.data['success']) {
      throw new Error(response.data['message']);
    }
  } catch (e) {
    api.access.deny(e, 'Something went wrong');
  }
};
