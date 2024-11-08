'use client'
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { GiDialPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form"
import { LoginSchema , loginSchema } from "../../../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../lib/actions";
import { useRouter } from "next/navigation";
import UsePresenceStore from "app/hooks/usePresenceStore";


export default function LoginForm() {
  const router = useRouter();
  const { add } = UsePresenceStore(); // Call the hook inside the component
  const { members } = UsePresenceStore(); // Call the hook inside the component

  
  const {
    register,
    handleSubmit,
    formState: { errors , isValid , isSubmitting },
    setError,

  } =  useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });
  const onSubmit =  async (data: LoginSchema) => {
    const response = await loginUser(data);
    router.refresh();
    if(response){
      if(response.status === 'success'){
        router.refresh();
        router.push('/matches');
        console.log(members);

      }
      else {
        console.log(response);
      }
    }
   

   
  }

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-pink-200">
          <div className="flex flex-row items-center gap-3">
            <GiDialPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input label="Email" variant="bordered" {...register("email" , { required: 'Email is required' })} defaultValue="" isInvalid={!!errors.email} errorMessage={errors.email?.message as string}/>
            <Input label="Password" variant="bordered" {...register("password" , { required: 'Password is required' })} defaultValue="" isInvalid={!!errors.email} errorMessage={errors.password?.message as string}/>
            <Button fullWidth variant="solid" type="submit" isDisabled={!isValid} isLoading={isSubmitting}>Login</Button>
      

          </div>
        </form>
      </CardBody>
    </Card>
  );
}

