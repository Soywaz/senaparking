import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StylesLogin.css';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        tipoDoc: '',
        documento: '',
        password: '',
        rol: '',
        nombre: '',
        correo: '',
        confirmarPassword: '',
        ficha: '',
        centro: '',
        codigoVerificacion: ''
    });
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Agregar fondo unificado
        document.body.classList.add('auth-background');
        
        // Detectar si es dispositivo móvil
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Prevenir zoom en iOS al enfocar inputs
        const preventZoom = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
                e.target.style.fontSize = '16px';
            }
        };
        
        document.addEventListener('focusin', preventZoom);
        
        return () => {
            document.body.classList.remove('auth-background');
            window.removeEventListener('resize', checkMobile);
            document.removeEventListener('focusin', preventZoom);
        };
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de login...
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Lógica de registro...
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setForm({
            tipoDoc: '',
            documento: '',
            password: '',
            rol: '',
            nombre: '',
            correo: '',
            confirmarPassword: '',
            ficha: '',
            centro: '',
            codigoVerificacion: ''
        });
    };

    const handleFocus = (e) => {
        if (isMobile) {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h1 className="neon-title">
                    {isLogin ? 'Inicia Sesión' : 'Regístrate Aquí'}
                </h1>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {!isLogin && (
                        <>
                            <label className="label">Nombre completo</label>
                            <input
                                type="text"
                                name="nombre"
                                className="input"
                                value={form.nombre}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Tu nombre completo"
                                autoComplete="name"
                                required={!isLogin}
                            />
                        </>
                    )}
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Tipo de documento</label>
                            <select
                                name="tipoDoc"
                                value={form.tipoDoc}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="input"
                                required
                            >
                                <option value="">Selecciona el tipo</option>
                                <option value="CC">Cédula de ciudadanía</option>
                                <option value="TI">Tarjeta de identidad</option>
                                <option value="DNI">Documento nacional</option>
                                <option value="CE">Cédula de extranjería</option>
                                <option value="PP">Pasaporte</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label className="label">Número de documento</label>
                            <input
                                type="text"
                                name="documento"
                                value={form.documento}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="input"
                                placeholder="Ej: 1234567890"
                                autoComplete="username"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                required
                            />
                        </div>
                    </div>
                    
                    {!isLogin && (
                        <>
                            <label className="label">Correo electrónico</label>
                            <input
                                type="email"
                                name="correo"
                                className="input"
                                value={form.correo}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="ejemplo@correo.com"
                                autoComplete="email"
                                required={!isLogin}
                            />
                        </>
                    )}
                    
                    <label className="label">Rol</label>
                    <select
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        className="input"
                        required
                    >
                        <option value="">Selecciona tu rol</option>
                        {isLogin ? (
                            <>
                                <option value="admin">Administrador</option>
                                <option value="instructor">Instructor</option>
                                <option value="aprendiz">Aprendiz</option>
                                <option value="vigilante">Vigilante</option>
                                <option value="visitante">Visitante</option>
                                <option value="empleado">Empleado</option>
                            </>
                        ) : (
                            <>
                                <option value="administrador">Administrador</option>
                                <option value="instructor">Instructor</option>
                                <option value="aprendiz">Aprendiz</option>
                                <option value="vigilante">Vigilante</option>
                                <option value="visitante">Visitante</option>
                                <option value="empleado">Empleado</option>
                            </>
                        )}
                    </select>
                    
                    {!isLogin && form.rol === 'aprendiz' && (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="label">Ficha</label>
                                    <input
                                        type="text"
                                        name="ficha"
                                        className="input"
                                        value={form.ficha}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        placeholder="Número de ficha"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="label">Centro</label>
                                    <input
                                        type="text"
                                        name="centro"
                                        className="input"
                                        value={form.centro}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        placeholder="Centro de formación"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    
                    {!isLogin && form.rol === 'instructor' && (
                        <>
                            <label className="label">Centro de formación</label>
                            <input
                                type="text"
                                name="centro"
                                className="input"
                                value={form.centro}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Nombre del centro"
                                required
                            />
                            
                            <label className="label">Código de verificación</label>
                            <input
                                type="text"
                                name="codigoVerificacion"
                                className="input"
                                value={form.codigoVerificacion}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Código otorgado por SENA"
                                required
                            />
                        </>
                    )}
                    
                    {!isLogin && (form.rol === 'vigilante' || form.rol === 'administrador') && (
                        <>
                            <label className="label">Código de verificación</label>
                            <input
                                type="text"
                                name="codigoVerificacion"
                                className="input"
                                value={form.codigoVerificacion}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Código especial de acceso"
                                required
                            />
                        </>
                    )}
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                className="input"
                                placeholder={isLogin ? "Tu contraseña" : "Crea una contraseña"}
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                minLength="6"
                                required
                            />
                        </div>
                        
                        {!isLogin && (
                            <div className="form-group">
                                <label className="label">Confirmar</label>
                                <input
                                    type="password"
                                    name="confirmarPassword"
                                    className="input"
                                    value={form.confirmarPassword}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    placeholder="Confirma contraseña"
                                    autoComplete="new-password"
                                    minLength="6"
                                    required={!isLogin}
                                />
                            </div>
                        )}
                    </div>
                    
                    <button type="submit" className="btn-primary">
                        {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
                    </button>
                </form>
                
                <div className="text-center mt-4">
                    <span className="text-light">
                        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                    </span>
                    <button 
                        type="button"
                        onClick={toggleMode} 
                        className="text-green-400"
                    >
                        {isLogin ? 'Registrar cuenta' : 'Iniciar sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;