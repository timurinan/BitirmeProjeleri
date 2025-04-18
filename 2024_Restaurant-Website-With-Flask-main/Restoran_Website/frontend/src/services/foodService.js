// foodService.js
import axios from 'axios';

export const getAllTags = async () => {
  try {
    const response = await axios.get('/api/tags');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const getAll = async () => {
  try {
    const response = await axios.get('/api/foods');
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const getAllByTag = async (tag) => {
  try {
    const response = await axios.get(`/api/foods/tag/${tag}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching foods by tag ${tag}:`, error);
    throw error;
  }
};

export const search = async (term) => {
  try {
    const response = await axios.get(`/api/foods/search/${term}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching foods with term ${term}:`, error);
    throw error;
  }
};


export const getById = async (foodId) => {
  try {
    const response = await axios.get(`/api/foods/${foodId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching food by ID ${foodId}:`, error);
    throw error;
  }
};