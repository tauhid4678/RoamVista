import api from './api';
import { MOCK_TOURS } from '../data/mockTours';

export const tourService = {
  async getTours(params = {}) {
    try {
      const response = await api.get('/tours', { params });
      if (response.data && response.data.success) {
        return response.data;
      }
      return { success: true, data: MOCK_TOURS, total: MOCK_TOURS.length };
    } catch (error) {
      console.warn('[TourService] Backend unreachable, falling back to cached catalog:', error.message);
      return { success: true, data: MOCK_TOURS, total: MOCK_TOURS.length };
    }
  },

  async getFeaturedTours() {
    try {
      const response = await api.get('/tours/featured');
      if (response.data && response.data.success && response.data.data.length > 0) {
        return response.data.data;
      }
      return MOCK_TOURS.filter((t) => t.isFeatured).slice(0, 4);
    } catch (error) {
      return MOCK_TOURS.filter((t) => t.isFeatured).slice(0, 4);
    }
  },

  async getPublicStats() {
    try {
      const response = await api.get('/tours/stats');
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.warn('[TourService] Failed to load public stats:', error.message);
      return null;
    }
  },

  async getTourById(id) {
    try {
      const response = await api.get(`/tours/${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return MOCK_TOURS.find((t) => t.id === id || t.slug === id) || MOCK_TOURS[0];
    } catch (error) {
      return MOCK_TOURS.find((t) => t.id === id || t.slug === id) || MOCK_TOURS[0];
    }
  },

  async createTour(tourData) {
    const response = await api.post('/tours', tourData);
    return response.data;
  },

  async updateTour(id, tourData) {
    const response = await api.put(`/tours/${id}`, tourData);
    return response.data;
  },

  async deleteTour(id) {
    const response = await api.delete(`/tours/${id}`);
    return response.data;
  },
};

export default tourService;
