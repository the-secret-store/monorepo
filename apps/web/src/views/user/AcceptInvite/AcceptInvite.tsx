import type { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ObjectID as ObjectIdType } from 'typeorm';
import { Home5 as HomeIcon } from '@styled-icons/remix-line';
import { Cross } from '@styled-icons/entypo';
import { CheckmarkCircleOutline } from '@styled-icons/evaicons-outline';
import { theme } from '$web/base/theme';
import { Button, Loader } from '$web/components';
import { Requests } from '$web/constants';
import { useRequest } from '$web/hooks';
import { AcceptInviteStyleWrapper } from './accept-invite.style';

export function AcceptInvite() {
  const { invitationId } = useParams();
  const request = useRequest();
  const [promiseState, setPromiseState] = useState<'loading' | 'success' | 'failed'>('loading');
  const [projectId, setProjectId] = useState<string | ObjectIdType>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const acceptInvite = useCallback(async () => {
    try {
      const { result } = (
        await request.patch(Requests.users.ACCEPT_INVITATION(invitationId as string))
      ).data;
      setPromiseState('success');
      setProjectId(result.teamOrProjectId);
      return result;
    } catch (error) {
      setPromiseState('failed');
      throw error;
    }
  }, [request, invitationId]);

  useEffect(() => {
    acceptInvite().catch(({ response }: AxiosError) => {
      if (typeof response?.data.message === 'string') setErrorMessage(response?.data.message);
      else setErrorMessage('There was an error accepting the invitation');
      console.error(response?.data);
    });
  }, [acceptInvite]);

  return (
    <AcceptInviteStyleWrapper>
      {promiseState === 'loading' && (
        <>
          <Loader />
          <p>Processing your request...</p>
        </>
      )}
      {promiseState === 'success' && (
        <>
          <CheckmarkCircleOutline size={80} color={theme.colors.green} />
          <p>Your request has been accepted!</p>
          <Button link={`/projects/${projectId}`}> {'->'}View Project</Button>
        </>
      )}
      {promiseState === 'failed' && (
        <>
          <Cross size={100} color={theme.colors.red} />
          <p>{errorMessage}</p>
          <Button link='/'>
            <HomeIcon size={20} /> Home
          </Button>
        </>
      )}
    </AcceptInviteStyleWrapper>
  );
}
