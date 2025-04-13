
interface ElectronAPI {
  // User API
  userGetAll: () => Promise<any[]>;
  userGetById: (id: string) => Promise<any>;
  userGetByEmail: (email: string) => Promise<any>;
  userAuthenticate: (email: string, password: string) => Promise<any>;
  userRegister: (userData: any) => Promise<any>;
  
  // Tour API
  tourGetAll: () => Promise<any[]>;
  tourGetById: (id: string) => Promise<any>;
  tourGetByCategory: (category: string) => Promise<any[]>;
  tourGetFeatured: () => Promise<any[]>;
  tourAdd: (tourData: any) => Promise<any>;
  tourUpdate: (id: string, tourData: any) => Promise<any>;
  tourDelete: (id: string) => Promise<boolean>;
  
  // Vehicle API
  vehicleGetAll: () => Promise<any[]>;
  vehicleGetById: (id: string) => Promise<any>;
  vehicleGetByType: (type: string) => Promise<any[]>;
  vehicleAdd: (vehicleData: any) => Promise<any>;
  vehicleUpdate: (id: string, vehicleData: any) => Promise<any>;
  vehicleDelete: (id: string) => Promise<boolean>;
  
  // Booking API
  bookingGetAll: () => Promise<any[]>;
  bookingGetById: (id: string) => Promise<any>;
  bookingGetByUserId: (userId: string) => Promise<any[]>;
  bookingAdd: (bookingData: any) => Promise<any>;
  bookingUpdate: (id: string, bookingData: any) => Promise<any>;
  bookingDelete: (id: string) => Promise<boolean>;
}

interface Window {
  electronAPI: ElectronAPI;
}
