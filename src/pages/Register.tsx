import Input from 'components/ui/Input';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from 'hooks/auth';
import { UserFormData, userSchema } from 'schemas/userSchema';
import { useSetAuthField } from 'hooks/useSetAuthField';
import { useAuthData } from 'hooks/useAuthData';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const { setAuthField } = useSetAuthField();
  const { isAuthenticated } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const { mutate: registerBusinessAdmin, isPending: isRegisterBusinessAdminLoading } =
    useRegisterUserMutation({
      onSuccess: (res) => {
        setAuthField('auth_status', 'authenticated');
        setAuthField('firstname', res?.data?.details?.firstname);
        setAuthField('lastname', res?.data?.details?.lastname);
        setAuthField('role', res?.data?.details?.role);
        setAuthField('token', res?.data?.access_token.token);

        toast.success('Successfully registered.')

        navigate('/');
      },
      onError: () => {},
    });

  const onSubmit = (data: UserFormData) => {
    registerBusinessAdmin(data);
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-12 bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 bg-opacity-80">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img src="/images/app-logo.png" alt="ListaKo Logo" className="w-12 h-12" />
          <h2 className="text-3xl font-bold text-primary">ListaKo</h2>
        </div>

        <p className="text-center text-gray-600 mb-6 text-lg">Create an account</p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <Input
            label="Firstname"
            type="text"
            placeholder="Enter firstname"
            error={errors.firstname ? errors.firstname.message : ''}
            {...register('firstname')}
          />

          <Input
            label="Lastname"
            type="text"
            placeholder="Enter lastname"
            error={errors.lastname ? errors.lastname.message : ''}
            {...register('lastname')}
          />

          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            error={errors.username ? errors.username.message : ''}
            {...register('username')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            error={errors.email ? errors.email.message : ''}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            error={errors.password ? errors.password.message : ''}
            {...register('password')}
          />

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full py-3 rounded-md text-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              disabled={isRegisterBusinessAdminLoading}
            >
              {isRegisterBusinessAdminLoading ? 'Loading..' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-4 flex justify-center text-sm">
          <Link to="/login" className="text-primary hover:underline text-center">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
