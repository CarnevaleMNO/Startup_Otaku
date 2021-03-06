import { auth } from "~/utils/firebase";
import { sendPasswordResetEmail } from "@firebase/auth";
import { redirect, Form, Link } from "remix";

export let action = async ({ request }) => {
  // pull in the form data from the request after the form is submitted
  let formData = await request.formData();

  let email = formData.get("email");

  // perform firebase send password reset email
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log("Error: ", err.message);
  }
  // success, send user to /login page
  return redirect("/login");
};

export default function Login() {
  return (
    <div className="login-page">
      <div className="authTitle">
        <h1>Forgot Password?</h1>
      </div>
      <Form method="post">
        <p>Enter the email address associated with your account</p>
        <input
          className="loginInput"
          type="email"
          name="email"
          placeholder="you@awesome.dev"
          required
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </Form>
      <div className="additionalLinks">
        Not Yet Registered? <Link to="/auth/register">Register</Link>
      </div>
    </div>
  );
}
