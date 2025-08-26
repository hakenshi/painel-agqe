"use server";

import { apiClient } from "@/lib/api";
import { createUserSchema, updateUserSchema } from "@/lib/zod/zod-user-schema";
import { revalidatePath } from "next/cache";
import { storeFileUrl } from "@/server/bucket";

function formDataToObject(userData: FormData) {
  const birthDateStr = userData.get('birthDate')?.toString();
  const joinedAtStr = userData.get('joinedAt')?.toString();
  
  let birthDate: Date | undefined;
  let joinedAt: Date | undefined;
  
  try {
    birthDate = birthDateStr ? new Date(birthDateStr) : undefined;
    joinedAt = joinedAtStr ? new Date(joinedAtStr) : undefined;
  } catch {
    // Invalid dates will remain undefined
  }
  
  return {
    firstName: userData.get('firstName')?.toString() || '',
    secondName: userData.get('secondName')?.toString() || '',
    cpf: userData.get('cpf')?.toString() || '',
    occupation: userData.get('occupation')?.toString() || '',
    color: userData.get('color')?.toString() || 'pink',
    birthDate,
    joinedAt,
    password: userData.get('password')?.toString() || undefined,
    photo: userData.get('photo') as File | null,
  };
}

export async function getAllUsers() {
  return await apiClient.get<User[]>('/users');
}

export async function createUser(userData: FormData) {
  try {
    const formData = formDataToObject(userData);
    const parsedValues = createUserSchema.safeParse(formData);

    if (!parsedValues.success) {
      return {
        success: false,
        userData: null,
        message: `Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`
      };
    }

    const photoFile = userData.get('photo') as File | null;
    const photoUrl = photoFile && photoFile.size > 0 ? await storeFileUrl(photoFile, 'users') : null;
    
    const dataToSend = {
      first_name: parsedValues.data.firstName,
      second_name: parsedValues.data.secondName,
      cpf: parsedValues.data.cpf,
      occupation: parsedValues.data.occupation,
      color: parsedValues.data.color,
      birth_date: parsedValues.data.birthDate.toISOString().split('T')[0],
      joined_at: parsedValues.data.joinedAt.toISOString().split('T')[0],
      password: parsedValues.data.password,
      photo: photoUrl as string | null
    };

    const response = await apiClient.post('/users', dataToSend) as User;
    revalidatePath("/usuarios");
    return {
      success: true,
      userData: response.firstName + ' ' + response.secondName,
    };
  } catch (error) {
    return {
      success: false,
      userData: null,
      message: error instanceof Error ? error.message : "Erro ao criar usuário"
    };
  }
}

export async function updateUser(userId: number, userData: FormData) {
  try {
    const formData = formDataToObject(userData);
    const parsedValues = updateUserSchema.safeParse(formData);

    if (!parsedValues.success) {
      return {
        success: false,
        userData: null,
        message: `Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`
      };
    }

    const photoFile = userData.get('photo') as File | null;
    let photoUrl: string | undefined;
    
    if (photoFile && photoFile.size > 0) {
      const result = await storeFileUrl(photoFile, 'users');
      photoUrl = result || undefined;
    }
    
    const dataToSend = {
      first_name: parsedValues.data.firstName,
      second_name: parsedValues.data.secondName,
      cpf: parsedValues.data.cpf,
      occupation: parsedValues.data.occupation,
      color: parsedValues.data.color,
      birth_date: parsedValues.data.birthDate?.toISOString().split('T')[0],
      joined_at: parsedValues.data.joinedAt?.toISOString().split('T')[0],
      ...(parsedValues.data.password && { password: parsedValues.data.password }),
      ...(photoUrl && { photo: photoUrl })
    };

    const response = await apiClient.put(`/users/${userId}`, dataToSend) as User;
    
    revalidatePath("/usuarios");
    return {
      success: true,
      userData: response.firstName + ' ' + response.secondName,
    };
  } catch (error) {
    return {
      success: false,
      userData: null,
      message: error instanceof Error ? error.message : "Erro ao atualizar usuário"
    };
  }
}

export async function deleteUser(userId: number) {
  try {
    await apiClient.delete(`/users/${userId}`);
    revalidatePath("/usuarios");
    return {
      success: true,
      userData: null,
    };
  } catch (error) {
    return {
      success: false,
      userData: null,
      message: error instanceof Error ? error.message : "Erro ao excluir usuário",
    };
  }
}