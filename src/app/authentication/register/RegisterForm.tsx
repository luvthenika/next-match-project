'use client'
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { GiDialPadlock } from "react-icons/gi";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "../../../../schemas/RegistrationSchema";
import { registerUser } from "../../lib/actions";
import { ActionResult } from "../../../types";
import { useRouter } from "next/navigation";
type Inputs = {
fullName:string
  username:string
  email:string
  password:string

}
export type UserData = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  image: string | null;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    
    formState: { errors , isValid , isSubmitting},
  } =  useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched'
  });
  const onSubmit: SubmitHandler<Inputs> = async (data : SignUpSchema) => {
    const response : ActionResult<UserData> = await registerUser(data);
    if(response.status === 'success'){
      console.log('User registered successfully')
      router.push('/authentication/login');
      
    } else {
      if(Array.isArray(response.error)){
        response.error.forEach((e) => {
          const fieldName = e.path.join('.') as "fullName" | "username" | "email" | "password" 
          setError(fieldName ,{message : e.message})
        })
      }
      else {
        setError('root.ServerError' , {message : response.error})
      }
    }
  }
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-pink-200">
          <div className="flex flex-row items-center gap-3">
            <GiDialPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Meet new people with Next Match App</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
          <Input label="Fullname" variant="bordered" {...register("fullName" , { required: 'Fullname is required' })} defaultValue="" isInvalid={!!errors.fullName} errorMessage={errors.fullName?.message as string}/>
            <Input label="Username" variant="bordered" {...register("username" , { required: 'Username is required' })} defaultValue="" isInvalid={!!errors.username} errorMessage={errors.username?.message as string}/>
            <Input label="Email" variant="bordered" {...register("email" , { required: 'Email is required' })} defaultValue="" isInvalid={!!errors.email} errorMessage={errors.email?.message as string}/>
            <Input label="Password" variant="bordered" {...register("password" , { required: 'Password is required' })} defaultValue="" isInvalid={!!errors.email} errorMessage={errors.password?.message as string}/>
            {errors.root?.ServerError && <p className='text-danger text-sm'>{errors.root.ServerError.message}</p>}
            <Button 
            fullWidth 
            variant="solid" 
            type="submit"
            isDisabled={!isValid}
            isLoading={isSubmitting}
            >Register</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

