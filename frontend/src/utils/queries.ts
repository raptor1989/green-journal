import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from './api';


// React Query v5+ API expects an object with queryKey and queryFn
export function useActionSummary() {
  return useQuery({
    queryKey: ['actionSummary'],
    queryFn: () => apiFetch('/api/actions/summary'),
  });
}

export function useActionCalendar() {
  return useQuery({
    queryKey: ['actionCalendar'],
    queryFn: () => apiFetch('/api/actions/calendar'),
  });
}

export function useActiveChallenges() {
  return useQuery({
    queryKey: ['activeChallenges'],
    queryFn: () => apiFetch('/api/challenges/active'),
  });
}

export function useJoinChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch(`/api/user-challenges/${id}/join`, { method: 'POST' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activeChallenges'] }),
  });
}

export function useCompleteChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch(`/api/user-challenges/${id}/complete`, { method: 'POST' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activeChallenges'] }),
  });
}

export function useAvailableRewards() {
  return useQuery({
    queryKey: ['availableRewards'],
    queryFn: () => apiFetch('/api/rewards/available'),
  });
}

export function useClaimReward() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch(`/api/rewards/${id}/claim`, { method: 'POST' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['availableRewards'] }),
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => apiFetch('/api/users/leaderboard'),
  });
}
