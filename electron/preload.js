
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // User API
  userGetAll: () => ipcRenderer.invoke('user:getAll'),
  userGetById: (id) => ipcRenderer.invoke('user:getById', id),
  userGetByEmail: (email) => ipcRenderer.invoke('user:getByEmail', email),
  userAuthenticate: (email, password) => ipcRenderer.invoke('user:authenticate', { email, password }),
  userRegister: (userData) => ipcRenderer.invoke('user:register', userData),
  userUpdate: (id, userData) => ipcRenderer.invoke('user:update', { id, ...userData }),
  userDelete: (id) => ipcRenderer.invoke('user:delete', id),
  
  // Tour API
  tourGetAll: () => ipcRenderer.invoke('tour:getAll'),
  tourGetById: (id) => ipcRenderer.invoke('tour:getById', id),
  tourGetByCategory: (category) => ipcRenderer.invoke('tour:getByCategory', category),
  tourGetFeatured: () => ipcRenderer.invoke('tour:getFeatured'),
  tourAdd: (tourData) => ipcRenderer.invoke('tour:add', tourData),
  tourUpdate: (id, tourData) => ipcRenderer.invoke('tour:update', { id, ...tourData }),
  tourDelete: (id) => ipcRenderer.invoke('tour:delete', id),
  
  // Vehicle API
  vehicleGetAll: () => ipcRenderer.invoke('vehicle:getAll'),
  vehicleGetById: (id) => ipcRenderer.invoke('vehicle:getById', id),
  vehicleGetByType: (type) => ipcRenderer.invoke('vehicle:getByType', type),
  vehicleAdd: (vehicleData) => ipcRenderer.invoke('vehicle:add', vehicleData),
  vehicleUpdate: (id, vehicleData) => ipcRenderer.invoke('vehicle:update', { id, ...vehicleData }),
  vehicleDelete: (id) => ipcRenderer.invoke('vehicle:delete', id),
  
  // Booking API
  bookingGetAll: () => ipcRenderer.invoke('booking:getAll'),
  bookingGetById: (id) => ipcRenderer.invoke('booking:getById', id),
  bookingGetByUserId: (userId) => ipcRenderer.invoke('booking:getByUserId', userId),
  bookingAdd: (bookingData) => ipcRenderer.invoke('booking:add', bookingData),
  bookingUpdate: (id, bookingData) => ipcRenderer.invoke('booking:update', { id, ...bookingData }),
  bookingDelete: (id) => ipcRenderer.invoke('booking:delete', id),
});
