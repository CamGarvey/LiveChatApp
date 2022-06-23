interface UserProps extends React.ComponentPropsWithoutRef<'div'> {
  id: string;
  image: string;
  name?: string;
  username: string;
  value: string;
  label: string;
}

export default UserProps;
