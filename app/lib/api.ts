import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://expense-tracker-backend-qu69.onrender.com/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data: any) => api.post("/auth/register", data),
  login: (data: any) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data: any) => api.put("/auth/profile", data),
  changePassword: (data: any) => api.post("/auth/change-password", data),
  logout: () => api.post("/auth/logout"),
};

// Transaction APIs
export const transactionAPI = {
  getAll: (params?: any) => api.get("/transactions", { params }),
  getOne: (id: string) => api.get(`/transactions/${id}`),
  create: (data: any) => api.post("/transactions", data),
  update: (id: string, data: any) => api.put(`/transactions/${id}`, data),
  delete: (id: string) => api.delete(`/transactions/${id}`),
  getStats: (params?: any) => api.get("/transactions/stats/summary", { params }),
  bulkCreate: (data: any) => api.post("/transactions/bulk", data),
  getRecurring: () => api.get("/transactions/recurring/all"),
  exportCSV: () => api.get("/transactions/export/csv", { responseType: 'blob' }),
};

// Category APIs
export const categoryAPI = {
  getAll: (params?: any) => api.get("/categories", { params }),
  getOne: (id: string) => api.get(`/categories/${id}`),
  create: (data: any) => api.post("/categories", data),
  update: (id: string, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
  setBudget: (id: string, data: any) => api.post(`/categories/${id}/budget`, data),
  getStats: (id: string, params?: any) => api.get(`/categories/${id}/stats`, { params }),
  resetToDefault: () => api.post("/categories/reset/default"),
  getSpending: (params?: any) => api.get("/categories/analytics/spending", { params }),
};

export default api;