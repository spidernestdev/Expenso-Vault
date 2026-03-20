import LoginForm from "@/app/components/auth/LoginForm";

export const metadata = {
  title: "Login - Expenso",
  description: "Login to your Expenso account to manage your expenses and budget.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}