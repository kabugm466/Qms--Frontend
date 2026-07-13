import api from './api';

const serviceApi = {
  listPublicByInstitution: (institutionId) =>
    api.get(`/services?institutionId=${institutionId}`, { auth: false }),
  listMine: () => api.get('/services/mine'),
  create: (payload) => api.post('/services', payload),
  update: (id, payload) => api.put(`/services/${id}`, payload),
  setStatus: (id, isActive) => api.patch(`/services/${id}/status`, { isActive }),
  remove: (id) => api.delete(`/services/${id}`),
};

export default serviceApi;
