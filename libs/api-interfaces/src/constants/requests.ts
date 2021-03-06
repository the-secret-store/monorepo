import { ObjectID as ObjectIdType } from 'typeorm';

export const Requests = {
  LOGIN: 'auth/login',
  projects: {
    GET_ACCESSIBLE: 'project/accessible',
    CREATE_PROJECT: 'project',
    GET_USERS_WITH_ACCESS: (projectId: string | ObjectIdType) => `project/${projectId}/access`,
    GET_PROJECT_INFO: (projectId: string | ObjectIdType) => `project/${projectId}`,
    GET_PROJECT_SECRETS: (projectId: string | ObjectIdType) => `project/secrets/${projectId}`,
    POST_PROJECT_SECRETS: (projectId: string | ObjectIdType) => `project/secrets/${projectId}`,
  },
  invitations: {
    INVITE_TO_PROJECT: 'invitation/invite-to-project',
  },
  users: {
    GENERATE_TOKEN: 'user/generate-token',
    ACCEPT_INVITATION: (invitationId: string | ObjectIdType) => `invitation/${invitationId}/accept`,
  },
  auth: {
    VALIDATE_TOKEN: 'auth/validate-token',
  },
};
