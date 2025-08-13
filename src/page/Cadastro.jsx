import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from "react-router";
import logo from '../assets/logo.svg'

const Cadastro = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <div className="w-full max-w-lg rounded-lg border border-[var(--color-gray)]">

                {/* Modal Header */}
                <div className="p-5 flex justify-center items-center gap-2 text-4xl font-semibold border-b-1 border-[var(--color-gray)]">
                    <img src={logo} alt="" />
                    <span>Cadastro</span>
                </div>

                {/* Modal Body */}
                <div className="p-4">

                    {/* Usuário Input */}
                    <div className="mb-3">
                        <div className="flex items-center border border-[var(--color-gray)] rounded">
                            <span className="px-3 py-2 border-r border-[var(--color-gray)]">
                                <User size={18} className="text-[var(--color-gray)]" />
                            </span>
                            <input
                                type="text"
                                className="flex-1 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-red-1)] focus:border-transparent rounded-r"
                                placeholder="Usuário"
                            />
                        </div>
                    </div>

                    {/* Senha Input */}
                    <div className="mb-3">
                        <div className="flex items-center border border-[var(--color-gray)] rounded">
                            <span className="px-3 py-2 border-r border-[var(--color-gray)]">
                                <Lock size={18} className="text-[var(--color-gray)]" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-red-1)] focus:border-transparent"
                                placeholder="Senha"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="px-3 py-2 border-l border-[var(--color-gray)] text-[var(--color-gray)] hover:text-[var(--color-black)] cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Botão Cadastrar */}
                    <button className="py-2 px-4 w-full bg-[var(--color-red-2)] text-[var(--color-white)] font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-200 cursor-pointer">
                        CADASTRAR
                    </button>

                    {/* Linha Horizontal */}
                    <hr className="my-4 border-[var(--color-gray)]" />

                    {/* Já tem conta? */}
                    <div className="flex justify-center gap-2">
                        <span>Já tem conta?</span>
                        <Link
                            to="/login"
                            className="text-[var(--color-red-1)] hover:text-[var(--color-red-1)] hover:underline"
                        >
                            Clique aqui
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
