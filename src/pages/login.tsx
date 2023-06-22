import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { funValidateInput } from "./createAccount";
import Link from "next/link";
import Layout from "../components/layout";
import { useRouter } from "next/router";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const {
    global: { page, user, setCurrentUser, currentUser },
  } = useGlobalContext();

  const router = useRouter();
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    fetch(`/users?email=${form.email}?password=${form.password}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [form]);

  const errorPassword = funValidateInput(form.password);
  const errorUsername = funValidateInput(form.email);
  const newUser = user.filter(({ id }) => id === currentUser.id);
  console.log(newUser);
  console.log(user);

  const userDifferent = user.some(({ username }) => username === form.email);
  const thereIsPassword = user.some(
    ({ password }) => password === form.password
  );
  console.log(currentUser);

  const intoAccount = (email: boolean, password: boolean) => {
    if (!email) setError(true);
    if (!password) setError(true);
    else if (email && password) {
      setError(false);

      setCurrentUser({ name: form.email, id: currentUser.id });
      router.push("/userProfile");
    }
  };

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const goInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
    if (funValidateInput(form.password) || funValidateInput(form.email)) {
      setError(true);
    } else {
      intoAccount(userDifferent, thereIsPassword);
    }
  };

  return (
    <Layout>
      <div className="flex-1 mt-[3.7rem] flex gap-7">
        <Head>
          <title>{page} | Fazer login</title>
        </Head>
        <Image
          src="/food-2.jpg"
          width={500}
          height={300}
          alt="picture for login"
          className="w-full"
        />
        <form
          onSubmit={goInsideAccount}
          className="flex flex-col gap-8 justify-center w-[50%]"
        >
          <h1 className=" text-center font-bold text-3xl mt-5">Conecte-se</h1>

          <div>
            <label htmlFor="email" className="ml-3">
              Email{" "}
            </label>
            <input
              type="text"
              value={form.email}
              onChange={handleChange}
              id="email"
              placeholder="input your email"
              className="rounded-lg w-[97%] transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
            {errorUsername && error ? (
              <span className="block ml-3 italic text-red-500">
                Email de usuário invalido.
              </span>
            ) : (
              !userDifferent &&
              error && (
                <span className="block ml-3 italic text-red-500">
                  Usuário não cadastrado.
                </span>
              )
            )}
          </div>

          <div>
            <label htmlFor="password" className="ml-3">
              Senha
            </label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange}
              id="password"
              placeholder="input your password"
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
            {errorPassword && error ? (
              <span className="block ml-3 italic text-red-500">
                Senha invalida.
              </span>
            ) : (
              !thereIsPassword &&
              error && (
                <span className="block ml-3 italic text-red-500">
                  Senha incorreta.
                </span>
              )
            )}
          </div>
          <button
            type="submit"
            className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center"
          >
            Entrar
          </button>
          <Link href="/lostPassword">
            <a>
              <h2 className="text-xl font-medium underline">Perdeu a Senha?</h2>
            </a>
          </Link>
          <h2 className="text-2xl font-bold mt-4">Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <Link href="/createAccount">
            <button className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center mb-4">
              Cadastra-se
            </button>
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
