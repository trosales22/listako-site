import { Input, Button } from 'components/ui/components';
import React from 'react';
import AppLogo from '/images/app-logo.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "schemas/userSchema";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { useRegisterUserMutation } from 'hooks/auth';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    });

    const { mutate: registerUser, isPending: isRegisterUserLoading } = useRegisterUserMutation({
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
        onError: () => {
            toast.error("Registration failed. Please try again.");
        }
    });

    const onSubmit = (data: UserFormData) => {
        registerUser(data);
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <Input
                            label="Username"
                            type="text"
                            placeholder="Enter username"
                            className="text-base py-3"
                            fieldset
                            legend="Username"
                            requirementColor="text-red-500"
                            requirementLabel={errors.username?.message}
                            {...register("username")}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                            className="text-base py-3"
                            fieldset
                            legend="Email"
                            requirementColor="text-red-500"
                            requirementLabel={errors.email?.message}
                            {...register("email")}
                        />

                        <Input
                            label="First Name"
                            type="text"
                            placeholder="Enter first name"
                            className="text-base py-3"
                            fieldset
                            legend="First Name"
                            requirementColor="text-red-500"
                            requirementLabel={errors.firstname?.message}
                            {...register("firstname")}
                        />

                        <Input
                            label="Last Name"
                            type="text"
                            placeholder="Enter last name"
                            className="text-base py-3"
                            fieldset
                            legend="Last Name"
                            requirementColor="text-red-500"
                            requirementLabel={errors.lastname?.message}
                            {...register("lastname")}
                        />
                    </div>

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        className="text-base py-3"
                        fieldset
                        legend="Password"
                        requirementColor="text-red-500"
                        requirementLabel={errors.password?.message}
                        {...register("password")}
                    />

                    <Button 
                        variant="black" 
                        type="submit" 
                        className="w-full text-sm py-4 rounded-md"
                        disabled={isRegisterUserLoading}
                    >
                        {isRegisterUserLoading ? 'Loading..' : 'Register'}
                    </Button>

                    <div className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-sm text-black font-bold hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
