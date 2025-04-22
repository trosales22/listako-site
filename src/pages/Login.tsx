import { Input, Button } from 'components/ui/components';
import React, { useEffect } from 'react';
import AppLogo from '/images/app-logo.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "schemas/loginSchema";
import { toast } from 'react-toastify';
import { useLoginMutation } from 'hooks/auth';
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const authStatus = Cookies.get('auth_status') ?? '';

    useEffect(() => {
        if (authStatus === 'authenticated') {
            navigate("/");
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const { mutate: login, isPending: isLoginLoading } = useLoginMutation({
        onSuccess: (res) => {
            const role = res?.data?.details?.role

            toast.success("Successfully logged in.");

            Cookies.set('auth_status', 'authenticated');
            Cookies.set('token', res.data?.access_token?.token);
            Cookies.set('firstname', res?.data?.details?.firstname);
            Cookies.set('lastname', res?.data?.details?.lastname);
            Cookies.set('role', role);

            navigate("/");
        },
        onError: () => { }
    });

    const onSubmit = (data: LoginData) => {
        login(data);
    };

    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center p-6 app-background">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 space-y-6">
                <div className="flex justify-center">
                    <img
                        src={AppLogo}
                        alt="ListaKo"
                        className="rounded-full h-24 w-24 object-cover"
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Input
                        label="User ID"
                        type="text"
                        placeholder="Enter user ID"
                        className="text-xl py-4"
                        fieldset
                        legend="User ID"
                        requirementColor="text-red-500"
                        requirementLabel={errors.user_id ? errors.user_id.message : ""}
                        {...register("user_id")}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        className="text-xl py-4"
                        fieldset
                        legend="Password"
                        requirementColor="text-red-500"
                        requirementLabel={errors.password ? errors.password.message : ""}
                        {...register("password")}
                    />

                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-black hover:underline">Forgot password?</Link>
                    </div>

                    <Button 
                        variant="black" 
                        type="submit" 
                        className="w-full text-lg py-4 rounded-xl"
                        disabled={isLoginLoading}
                    >
                        {isLoginLoading ? 'Loading..' : 'Login'}
                    </Button>

                    <div className="text-center">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="text-sm text-black font-bold hover:underline">Sign-up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
