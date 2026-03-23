import { request } from './client';

export const getAllPets = () => request('/pets');
export const getPetById = id => request(`/pets/${id}`);
export const createPet = body =>
  request('/pets', {
    method: 'POST',
    body: JSON.stringify(body),
  });
export const updatePetName = (id, body) =>
  request(`/pets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
export const deletePet = id => request(`/pets/${id}`, { method: 'DELETE' });
