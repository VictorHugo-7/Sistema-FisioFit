import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, User } from 'lucide-react';

function Sistema() {
    const [userLogin, setUserLogin] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o usuário está logado
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');

        if (!token) {
            // Se não há token, redireciona para o login
            navigate('/login');
            return;
        }

        // Verifica se o token ainda é válido (opcional - requer endpoint no backend)
        // Por enquanto, apenas verifica se existe
        setUserLogin(login || 'Usuário');
    }, [navigate]);

    const handleLogout = () => {
        // Remove o token e dados do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('login');

        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">
                                Sistema
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Informações do usuário */}
                            <div className="flex items-center gap-2 text-gray-700">
                                <User size={18} />
                                <span>Olá, {userLogin}</span>
                            </div>

                            {/* Botão de logout */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                title="Sair"
                            >
                                <LogOut size={18} />
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Sistema;