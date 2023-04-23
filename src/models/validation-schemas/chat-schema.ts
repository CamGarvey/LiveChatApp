import * as Yup from 'yup';

const groupChatSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name too short!')
    .max(30, 'Name too long!')
    .required('Name is required'),
  description: Yup.string().max(40, 'Description is too long'),
});

export { groupChatSchema };
