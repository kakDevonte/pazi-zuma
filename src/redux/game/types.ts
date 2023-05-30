type Card = {
  name: string;
  level: number;
};

export type User = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  tryCounter: number;
  points: number;
  cards: Card[];
  personalNumber: number;
  isGame: boolean;
  isSubscribe: boolean;
  gameCounter: number;
  referrals: {
    referrer_id: number;
    is_active: boolean;
  };
};

export type GameState = {
  user: User;
  isOpen: boolean;
  level: number;
  sport: number;
  page: number;
  isPhone: boolean;
  isEndGame: boolean;
  bg: {
    load: string;
    main: string;
    normal: string;
    game: string;
  };
  startGame: string;
  points: number;
};
