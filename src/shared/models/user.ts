enum UserRole{
    ADMIN = "ADMIN",
    FARMINSPECTOR = "FARMINSPECTOR",
    HARVESTER = "HARVESTOR",
    EXPORTOR = "EXPORTER",
    IMPORTOR = "IMPORTER",
    PROCESSOR = "PROCESSOR",
}
  
enum UserStatus{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
  
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    contactNo?: string;
    address?: string;    
}
  
interface SystemUser extends User {
   role: UserRole;
   status: UserStatus;
}
