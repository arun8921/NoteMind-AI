import { useState } from "react";
import { User, Mail, Lock, Shield, Sparkles } from "lucide-react";
import { C } from "../services/theme";
import { AuthLayout } from "../layouts/AuthLayout";
import { Input } from "../components/common/Input";
import { Btn } from "../components/common/Button";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const { navigate } = useNavigation();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const passwordsMatch = conf.length === 0 || pass === conf;

  const handleSubmit = async () => {
    if (pass !== conf) { setError("Passwords do not match"); return; }
    setError("");
    setBusy(true);
    try {
      await register(name, email, pass);
      navigate("dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Create your account" sub="Start your free NoteMind AI journey">
      <div className="space-y-4">
        <div>
          <label className="text-[12px] font-semibold block mb-1.5" style={{ color: C.muted }}>Full name</label>
          <Input placeholder="Arun S" icon={User} value={name} onChange={setName} />
        </div>
        <div>
          <label className="text-[12px] font-semibold block mb-1.5" style={{ color: C.muted }}>Email address</label>
          <Input placeholder="you@example.com" type="email" icon={Mail} value={email} onChange={setEmail} />
        </div>
        <div>
          <label className="text-[12px] font-semibold block mb-1.5" style={{ color: C.muted }}>Password</label>
          <Input placeholder="Min. 8 characters" type="password" icon={Lock} value={pass} onChange={setPass} />
        </div>
        <div>
          <label className="text-[12px] font-semibold block mb-1.5" style={{ color: C.muted }}>Confirm password</label>
          <Input placeholder="Repeat password" type="password" icon={Shield} value={conf} onChange={setConf} />
          {!passwordsMatch && <p className="text-[11px] mt-1" style={{ color: C.danger }}>Passwords don't match</p>}
        </div>
        {pass.length > 0 && (
          <div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-1 h-1 rounded-full"
                  style={{ background: pass.length >= i * 2 ? (pass.length >= 8 ? C.success : C.primary) : "rgba(148,163,184,.15)" }} />
              ))}
            </div>
            <p className="text-[11px] mt-1" style={{ color: pass.length >= 8 ? C.success : C.muted }}>
              {pass.length >= 8 ? "Strong password" : "Keep typing…"}
            </p>
          </div>
        )}
        {error && (
          <p className="text-[12px] px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,.1)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,.25)" }}>
            {error}
          </p>
        )}
        <Btn onClick={handleSubmit} disabled={busy || !name || !email || pass.length < 8 || !passwordsMatch} className="w-full" size="md">
          <Sparkles size={14} /> {busy ? "Creating account…" : "Create Free Account"}
        </Btn>
        <p className="text-center text-[11px]" style={{ color: "#475569" }}>
          By creating an account you agree to our{" "}
          <span style={{ color: C.primaryLight }}>Terms</span> and{" "}
          <span style={{ color: C.primaryLight }}>Privacy Policy</span>.
        </p>
        <p className="text-center text-[12px]" style={{ color: C.muted }}>
          Already have an account?{" "}
          <button onClick={() => navigate("login")} style={{ color: C.primaryLight }} className="font-semibold">Sign in</button>
        </p>
      </div>
    </AuthLayout>
  );
}
