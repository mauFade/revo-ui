import { FC, FormEvent, useState } from "react";
import { HeadPage } from "@commons/components/modules/Head";
import Link from "next/link";
import { revoApi } from "@services/api/revoApi";
import { tokenKey } from "@commons/utils/constans/header";
import { useRouter } from "next/navigation";
import { showToast } from "@commons/utils/showToast";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import secureLocalStorage from "react-secure-storage";

const Home: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      const response = await revoApi.login(email, password);

      if (response.error && response.error === "Invalid password") {
        showToast("Senha errada!", "warning");
        return;
      }

      if (
        response.error &&
        response.error === "User not found with this email."
      ) {
        showToast("Usuário não encontrado com esse e-mail!", "warning");
        return;
      }

      secureLocalStorage.removeItem("user-data");

      secureLocalStorage.setItem("user-data", response.token);

      showToast("Login efetuado com sucesso!", "success");
      router.push("/feed");
    }
  };

  return (
    <>
      <HeadPage title="Login | Revo" />

      <div className="flex flex-row h-screen w-screen">
        <div className="h-full w-2/4"></div>
        <div className="flex flex-col justify-center items-center bg-themeBlack h-full w-2/4">
          <h1 className="font-extrabold text-xl pb-2">Acesse sua conta</h1>
          <h3 className="font-light text-themeMetal pb-2">
            Revo, onde as coisas acontecem!
          </h3>
          <form onSubmit={handleSubmit} className="w-2/4 pb-4">
            <label className="flex flex-col pb-3">
              <span className="font-semibold text-sm pb-1">Seu e-mail:</span>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none text-themeBlack font-semibold h-10 rounded-md pl-4 placeholder:text-themeBlack"
              />
            </label>

            <label className="flex flex-col pb-6">
              <span className="font-semibold text-sm pb-1">Sua senha:</span>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:outline-none text-themeBlack font-semibold h-10 rounded-md pl-4 placeholder:text-themeBlack"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-themeRed h-11 rounded-md hover:bg-themeDarkerRed transition-colors disabled:bg-themeUnactiveRed"
              disabled={email === "" && password === ""}
            >
              Entrar
            </button>
          </form>
          <span className="font-light text-themeMetal">
            Ainda não tem uma conta?{" "}
            <Link
              href="/register"
              className="hover:text-white border-b transition-colors"
            >
              Registre-se
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Home;
