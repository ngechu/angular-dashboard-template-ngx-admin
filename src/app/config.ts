function makeAppConfig() {
    const date = new Date();
    const year = date.getFullYear();
    return {
      brand: 'Manufacturer',
      year
    };
  }
  
  export enum HttpMethods {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete',
  }
  export const userGroups = [
    { name: 'Approved', id: `CONFIRMED` },
    { name: 'Unapproved', id: `PENDING` },
    { name: 'DECLINED', id: `DECLINED` },
    // { name: 'CONFIRMED', id: `CONFIRMED` },
    // { name: 'PENDING', id: `PENDING` },
    // { name: 'New Users', id: `1` },
    // { name: 'Modified Users', id: `7` },
    // { name: 'Deactivated Users', id: `5` },
    // { name: 'Deleted Users', id: `8` },
    // { name: 'Inactive Users', id: `3` },
    // { name: 'Lock Users', id: `12` },
    // { name: 'Locked Users', id: `13` },
    // { name: 'Unlocked Users', id: `14` },
  ];
  
  export const displayedColumns1 = [
    'select',
    'permission',
    'tag',
    'entity',
    'description',
    'creationDate',
    'actions',
  ];
  
  export const displayedColumns2 = [
    'permission',
    'tag',
    'entity',
    'description',
    'creationDate',
    'actions',
  ];
  
  export const permissionGroups = [
    { name: 'Approved', id: `Approved` },
    { name: 'Unapproved', id: `Unapproved` },
    { name: 'CONFIRMED', id: `CONFIRMED` },
    { name: 'PENDING', id: `PENDING` },
    
    // { name: 'Modified Permissions', id: `7` },
    // { name: 'Deactivated Permissions', id: `5` },
    // { name: 'Deleted Permissions', id: `8` },
    // { name: 'Activated Permissions', id: `10` },
    // { name: 'Inactive Permissions', id: `3` },
  ];
  
  export const permissionData = [
    { name: 'User', id: `1` },
    { name: 'Module', id: `2` },
    { name: 'Entity', id: `3` },
    { name: 'Permission', id: `4` },
    { name: 'Role', id: `5` },
  ];
  
  export const contentData = {
    data: {
      content: [{ id: 1, name: 'module' }, { id: 2, name: 'entities' }],
    },
  };
  
  export const userManagementActions = {
    DEACTIVATE: { id: 'deactivate', notes: 'deactivate users' },
    ACTIVATE: { id: 'activate', notes: 'activate users' },
    LOCK: { id: 'lock', notes: 'lock users' },
    UNLOCK: { id: 'unlock', notes: 'unlock users' },
    DELETE: { notes: 'delete users' },
    APPROVE: { id: 'approve', notes: 'approve' },
    DECLINE: { id: 'decline', notes: 'decline' },
  };
  
  export const APPCONFIG = makeAppConfig();
  