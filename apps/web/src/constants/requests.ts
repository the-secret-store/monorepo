import { ObjectID as ObjectIdType } from 'typeorm';

export const Requests = {
  LOGIN: 'auth/login',
  projects: {
    GET_ACCESSIBLE: 'project/accessible',
    CREATE_PROJECT: 'project',
    GET_USERS_WITH_ACCESS: (projectId: string | ObjectIdType) => `project/${projectId}/access`,
  },
  invitations: {
    INVITE_TO_PROJECT: 'invitation/invite-to-project',
  },
};
