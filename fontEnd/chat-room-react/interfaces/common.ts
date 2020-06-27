export interface ChatDataProps {
  id: number;
  time: string;
  userName: string;
  content: string;
  msgType: number;
  userId: number;
}

export interface MsgContentProps {
  userName: string;
  userContent: string;
  msgType: number;
}
