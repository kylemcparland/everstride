export const getLocation = (total_distance_travelled) => {
  return total_distance_travelled >= 10000
    ? "The Cave of the Wandering Wyrm"
    : total_distance_travelled >= 8000
    ? "The Pacing Peaks"
    : total_distance_travelled >= 6000
    ? "The Strider's Stronghold"
    : total_distance_travelled >= 4000
    ? "Paceport Village"
    : total_distance_travelled >= 2000
    ? "The Wanderwillow Woods"
    : "The Fields of Frollicking";
};
