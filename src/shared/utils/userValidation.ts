export const isActive = (user: SystemUser) => user.status === UserStatus.ACTIVE;
export const isProducer = (user: SystemUser) => user.role === UserRole.ADMIN && isActive(user);
export const isInspector = (user: SystemUser) => user.role === UserRole.FARMINSPECTOR && isActive(user);
