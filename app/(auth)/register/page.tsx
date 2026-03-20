import RegisterForm from "@/app/components/auth/RegisterForm";

export const metadata = {
  title: "Sign Up - Expenso",
  description: "Create your Expenso account and start tracking your expenses easily.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}