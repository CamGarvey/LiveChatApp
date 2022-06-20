import {
  ActionIcon,
  Button,
  Grid,
  InputWrapper,
  MediaQuery,
  Textarea,
} from '@mantine/core';
import { useFormik } from 'formik';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';

type Props = {
  onSubmit: ({ content }: { content: string }) => void;
  isDisabled: boolean;
  isLoading: boolean;
};

const ChatInput = ({ onSubmit, isLoading, isDisabled }: Props) => {
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: createMessageSchema,
    onSubmit,
  });

  return (
    <form style={{ marginTop: 'auto' }} onSubmit={formik.handleSubmit}>
      <Grid columns={6}>
        <Grid.Col span={5}>
          <InputWrapper required>
            <Textarea
              id="content"
              onChange={formik.handleChange}
              value={formik.values.content}
              autosize
              minRows={2}
              maxRows={4}
            />
          </InputWrapper>
        </Grid.Col>
        <Grid.Col span={1} sx={{ alignSelf: 'center' }}>
          <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
            <ActionIcon
              type="submit"
              loading={isLoading}
              disabled={isDisabled || isLoading}
              variant={'filled'}
              color={'blue'}
            >
              <Send />
            </ActionIcon>
          </MediaQuery>
          <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
            <Button
              type="submit"
              loading={isLoading}
              disabled={isDisabled || isLoading}
              fullWidth={true}
            >
              Send
            </Button>
          </MediaQuery>
        </Grid.Col>
      </Grid>
    </form>
  );
};

const createMessageSchema = Yup.object().shape({
  content: Yup.string()
    .min(1, 'Content Required!')
    .required('Name is required'),
});

export default ChatInput;
