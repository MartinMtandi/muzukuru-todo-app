import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: hsl(var(--card));
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  gap: 1rem;
`;

const SkeletonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkeletonActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TodoSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <Skeleton className="w-5 h-5 rounded-full" />
      <SkeletonContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/3" />
      </SkeletonContent>
      <SkeletonActions>
        <Skeleton className="w-8 h-8 rounded" />
        <Skeleton className="w-8 h-8 rounded" />
      </SkeletonActions>
    </SkeletonContainer>
  );
};

export const TodoListSkeleton: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <TodoSkeleton key={index} />
      ))}
    </div>
  );
};

export default TodoSkeleton;