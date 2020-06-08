class PlayerState {}

PlayerState.GUESSING = 'guessing';
PlayerState.JUDGING = 'judging';
PlayerState.REVEALING = 'revealing';
PlayerState.WAITING_FOR_GUESSES = 'waiting-for-guesses';
PlayerState.WAITING_FOR_JUDGMENT = 'waiting-for-judgment';
PlayerState.WAITING_FOR_REVEALS = 'waiting-for-reveals';

module.exports = PlayerState;
