const blistersEvent = {
  id: 'blisters',
  name: 'Blisters!',
  description: 'You feel a sharp pain in your foot. You have developed blisters.',
  options: [
    {
      id: 'stop_and_treat',
      name: 'Stop and treat',
      consequence: {
        stamina: -5,
        time: 30, // Minutes
      },
      text: 'You stop to treat your blisters. It takes some time, but you feel better.',
    },
    {
      id: 'push_through',
      name: 'Push through',
      consequence: {
        stamina: -15,
        hydration: -5,
      },
      text: 'You decide to ignore the pain and push through. The blisters get worse, and you lose stamina and hydration.',
    },
  ],
};

export default blistersEvent;
