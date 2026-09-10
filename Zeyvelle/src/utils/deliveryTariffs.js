export const indiaPostTariff = [
  { weight: 500, local: 31, within_state: 37, other_states: 41 },
  { weight: 1000, local: 37, within_state: 52, other_states: 67 },
  { weight: 1500, local: 42, within_state: 68, other_states: 94 },
  { weight: 2000, local: 53, within_state: 94, other_states: 135 },
  { weight: 3000, local: 67, within_state: 118, other_states: 171 },
  { weight: 4000, local: 81, within_state: 142, other_states: 207 },
  { weight: 5000, local: 95, within_state: 166, other_states: 241 },
  { weight: 6000, local: 114, within_state: 188, other_states: 277 },
  { weight: 7000, local: 131, within_state: 212, other_states: 313 },
  { weight: 8000, local: 148, within_state: 236, other_states: 349 },
  { weight: 9000, local: 167, within_state: 260, other_states: 383 },
  { weight: 10000, local: 184, within_state: 284, other_states: 419 },
  { weight: 11000, local: 201, within_state: 306, other_states: 455 },
  { weight: 12000, local: 220, within_state: 330, other_states: 489 },
  { weight: 13000, local: 237, within_state: 354, other_states: 525 },
  { weight: 14000, local: 254, within_state: 378, other_states: 561 },
  { weight: 15000, local: 273, within_state: 402, other_states: 595 },
  { weight: 16000, local: 290, within_state: 424, other_states: 631 },
  { weight: 17000, local: 307, within_state: 448, other_states: 667 },
  { weight: 18000, local: 326, within_state: 472, other_states: 703 },
  { weight: 19000, local: 343, within_state: 496, other_states: 737 },
  { weight: 20000, local: 362, within_state: 520, other_states: 773 },
  { weight: 21000, local: 379, within_state: 542, other_states: 809 },
  { weight: 22000, local: 396, within_state: 566, other_states: 843 },
  { weight: 23000, local: 415, within_state: 590, other_states: 879 },
  { weight: 24000, local: 432, within_state: 614, other_states: 915 },
  { weight: 25000, local: 449, within_state: 638, other_states: 949 },
  { weight: 26000, local: 468, within_state: 660, other_states: 985 },
  { weight: 27000, local: 485, within_state: 684, other_states: 1021 },
  { weight: 28000, local: 502, within_state: 708, other_states: 1057 },
  { weight: 29000, local: 521, within_state: 732, other_states: 1091 },
  { weight: 30000, local: 538, within_state: 756, other_states: 1127 },
  { weight: 31000, local: 555, within_state: 778, other_states: 1163 },
  { weight: 32000, local: 574, within_state: 802, other_states: 1197 },
  { weight: 33000, local: 591, within_state: 826, other_states: 1233 },
  { weight: 34000, local: 608, within_state: 850, other_states: 1269 },
  { weight: 35000, local: 627, within_state: 874, other_states: 1303 }
];

export const getLocationFromPincode = (pincode) => {
  if (!pincode || typeof pincode !== 'string') return 'international';
  
  const cleanPin = pincode.replace(/\D/g, '');
  
  if (cleanPin.length !== 6) {
    return 'international';
  }

  // Kozhikode, Kerala
  if (cleanPin.startsWith('673')) {
    return 'local';
  }

  // Kerala state pincodes start with 67, 68, or 69
  if (cleanPin.startsWith('67') || cleanPin.startsWith('68') || cleanPin.startsWith('69')) {
    return 'within_state';
  }

  // Other India states
  return 'other_states';
};

export const getDeliveryCharge = (weightInGrams, locationType) => {
  if (locationType === 'international') {
    return 1500; // Flat international placeholder rate
  }

  let applicableTier = indiaPostTariff[indiaPostTariff.length - 1]; // Default to highest if over limit
  
  for (let i = 0; i < indiaPostTariff.length; i++) {
    if (weightInGrams <= indiaPostTariff[i].weight) {
      applicableTier = indiaPostTariff[i];
      break;
    }
  }

  return applicableTier[locationType] || 0;
};
