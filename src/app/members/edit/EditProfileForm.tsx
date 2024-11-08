'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Slider, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { editProfileSchema } from "../../../../schemas/editProfileSchema";
import { updateProfile } from "app/lib/updateProfileActions";
import { useRouter } from "next/navigation";
import { calculateAge } from "app/lib/utils";

type Props = {
  member: Member;
};
const EditProfileForm = ({ member }: Props) => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty, errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
  });
  const onSubmit = async (data: any) => {
    const result = await updateProfile(data);
    if(result && result.status === 'success'){
        router.refresh();
        reset({...data});
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 "
    >
      <Input
        isClearable
        label="Name"
        variant="bordered"
        placeholder="Enter new name"
        defaultValue={member.name}
        {...register("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message?.toString()} 

      ></Input>
      <Textarea
        label="Description"
        variant="bordered"
        placeholder="Enter description"
        defaultValue={member.description}
        {...register("description")}
        isInvalid={!!errors.name}

        errorMessage={errors.description?.message?.toString()} 

      ></Textarea>
        <Controller name="age"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange,  value } }) => (
          <Slider
          onChange={onChange}
          label="Age" 
          step={1} 
          maxValue={100} 
          minValue={0} 
          defaultValue={calculateAge(member.dateOfbirth)}
          className="max-w-md"
          color="pink"
            value={value}
          />
        )}
      />

      <div className="flex flex-row space-x-2">
        <Input size="sm"
          isClearable
          label="City"
          variant="bordered"
          placeholder="Enter new city"
          defaultValue={member.city}
          {...register("city")}
          isInvalid={!!errors.name}
          errorMessage={errors.city?.message?.toString()} 

    ></Input>
        <Input  size="sm"
          isClearable
          label="Country"
          variant="bordered"
          placeholder="Enter new country"
          defaultValue={member.country}
          {...register("country")}
          isInvalid={!!errors.name}
          errorMessage={errors.country?.message?.toString()} 

        ></Input>

      </div>
      <Button
        type="submit"
        className="flex flex-end"
        variant="solid"
        color="pink"
        isDisabled={!isValid }
        isLoading={isSubmitting}
      >Apply changes</Button>
    </form>
  );
};

export default EditProfileForm;
