import { useState } from "react";
import { Mail, Lock, Check } from "lucide-react";
import { C } from "../services/theme";
import { AuthLayout } from "../layouts/AuthLayout";
import { Input } from "../components/common/Input";
import { Btn } from "../components/common/Button";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { navigate } = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rem, setRem] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setBusy(true);
    try {
      await login(email, pass);
      navigate("dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" sub="Sign in to your NoteMind AI account">
      <div className="space-y-4">
        <div>
          <label className="text-[12px] font-semibold block mb-1.5" style={{ color: C.muted }}>Email address</label>
          <Input placeholder="you@example.com" type="email" icon={Mail} value={email} onChange={setEmail} />
        </div>
        <div>
          <label className="text-[12px] font-semibold block mb-1.5" style={{ color: C.muted }}>Password</label>
          <Input placeholder="••••••••" type="password" icon={Lock} value={pass} onChange={setPass} />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <div onClick={() => setRem(!rem)} className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200"
              style={{ background: rem ? C.primary : "rgba(148,163,184,.12)", border: rem ? "none" : `1px solid ${C.border}` }}>
              {rem && <Check size={10} color="#fff" />}
            </div>
            <span className="text-[12px]" style={{ color: C.muted }}>Remember me</span>
          </label>
          <button className="text-[12px] font-medium" style={{ color: C.primaryLight }}>Forgot password?</button>
        </div>

        {error && (
          <p className="text-[12px] px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,.1)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,.25)" }}>
            {error}
          </p>
        )}

        <Btn onClick={handleSubmit} disabled={busy || !email || !pass} className="w-full mt-2" size="md">
          {busy ? "Signing in…" : "Sign in"}
        </Btn>

        <p className="text-center text-[12px]" style={{ color: C.muted }}>
          Don't have an account?{" "}
          <button onClick={() => navigate("register")} style={{ color: C.primaryLight }} className="font-semibold">Create one free</button>
        </p>
      </div>
    </AuthLayout>
  );
}
