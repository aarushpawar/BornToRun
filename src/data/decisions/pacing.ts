const pacingDecision = {
  id: 'pacing',
  name: 'Pace Selection',
  description: 'What pace do you want to run?',
  options: [
    {
      id: 'maintain',
      name: 'Maintain Pace',
      consequence: {
        stamina: -10,
        hydration: -5,
      },
      text: 'You maintain your current pace.',
    },
    {
      id: 'slow_down',
      name: 'Slow Down',
      consequence: {
        stamina: -5,
        hydration: -2,
        time: 15, // Minutes
      },
      text: 'You slow down your pace to conserve energy.',
    },
    {
      id: 'push_harder',
      name: 'Push Harder',
      consequence: {
        stamina: -20,
        hydration: -10,
      },
      text: 'You push harder to gain ground.',
    },
  ],
};

export default pacingDecision;
