import { useActionData, Form, redirect } from 'react-router-dom';

export default function SignupPage() {
  const errors = useActionData();
  return (
    <Form method="post">
      <p>
        <input type="text" name="nickname" />
        {errors?.nickname && <span>{errors.nickname}</span>}
      </p>

      <p>
        <input type="number" name="account_pw" />
        {errors?.account_pw && <span>{errors.account_pw}</span>}
      </p>

      <p>
        <button type="submit">Sign Up</button>
      </p>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const nickname = formData.get('nickname');
  const account_pw = formData.get('account_pw');
}
