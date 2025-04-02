import { Event, Consequence } from '../../types/game';

const dehydrationEvent: Event = {
  id: 'dehydration',
  name: 'Dehydration',
  description: 'You are starting to feel dehydrated. Your mouth is dry, and your energy is fading.',
  options: [
    {
      id: 'drink_water',
      name: 'Drink water (10 minutes)',
      consequence: {
        hydration: 30,
        time: 10,
      },
    },
    {
      id: 'push_on',
      name: 'Push on without drinking',
      consequence: {
        stamina: -15,
        hydration: -20,
        time: 0,
      },
    },
  ],
};

export default dehydrationEvent;
