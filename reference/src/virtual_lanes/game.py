from collections.abc import Iterator

import numpy as np

from virtual_lanes.alley import Alley
from virtual_lanes.bowler import Bowler


class Game:
    """
    Manages the simulation of a bowling game, providing detailed frame-by-frame results for each bowler.

    This class supports simulations on specified alleys with distinct characteristics, influencing the gameplay of the bowlers.

    Attributes:
        bowlers (List[Bowler]): A list of `Bowler` objects participating in the game.
        alley (Alley): The `Alley` object specifying the lane type and oil pattern where the game is played.
        random_seed (Optional[int]): Seed for the random number generator to ensure reproducibility, if provided.
    """
    def __init__(self, bowlers: list[Bowler], alley: Alley, random_seed: int | None = None) -> None:
        """
        Initialises a game with a list of bowlers and the alley where the game is played.

        Parameters:
            bowlers (list[Bowler]): List of Bowler objects participating in the game.
            alley (Alley): The Alley object specifying the lane type and oil pattern.
            random_seed (int, optional): Random seed for reproducibility of the simulation.
        """
        self.bowlers = bowlers
        self.alley = alley
        self.random_seed = random_seed
        # A dedicated generator keeps simulations reproducible and isolated from
        # the global NumPy RNG (which is shared process-wide and not thread-safe).
        self.rng = np.random.default_rng(random_seed)

    def simulate_frame(self, bowler: Bowler, frame_number: int) -> tuple[int, ...]:
        """
        Simulates a single frame for a given bowler based on the frame number.

        Parameters:
            bowler (Bowler): The Bowler object for whom the frame is simulated.
            frame_number (int): The frame number (0-indexed, 0-9).

        Returns:
            Tuple[int, ...]: A tuple representing the result of the frame (pins knocked down in each roll).
        """
        if frame_number < 9:
            return self.simulate_regular_frame(bowler)
        else:
            return self.simulate_last_frame(bowler)

    def simulate_regular_frame(self, bowler: Bowler) -> tuple[int, int]:
        """
        Simulates a regular frame (not the last one), accounting for strikes, spares and open frames.

        The first ball is a strike with probability ``bowler.strike_prob``. Otherwise, if pins
        remain the bowler converts the spare with probability ``bowler.spare_prob``; failing that
        the second ball leaves an open frame.

        Parameters:
            bowler (Bowler): The Bowler object for whom the frame is simulated.

        Returns:
            tuple[int, int]: A tuple of two integers representing the pins knocked down in each roll.
        """
        if self.rng.random() < bowler.strike_prob:
            return (10, 0)
        first_roll = int(self.rng.integers(0, 10))  # 0-9; a 10 would be a strike
        remaining = 10 - first_roll
        # Convert the spare with probability spare_prob, otherwise leave an open frame.
        converts_spare = self.rng.random() < bowler.spare_prob
        second_roll = remaining if converts_spare else int(self.rng.integers(0, remaining))
        return (first_roll, second_roll)

    def simulate_last_frame(self, bowler: Bowler) -> tuple[int, ...]:
        """
        Simulates the 10th frame, which may include up to three rolls depending on the bowler's performance.

        Parameters:
            bowler (Bowler): The Bowler object for whom the last frame is simulated.

        Returns:
            tuple[int, ...]: A tuple of up to three integers representing the pins knocked down in each roll.
        """
        rolls: list[int] = []

        # First roll
        if self.rng.random() < bowler.strike_prob:
            rolls.append(10)
        else:
            rolls.append(int(self.rng.integers(0, 10)))

        # Second roll
        if rolls[0] == 10:  # First roll was a strike: fresh rack
            if self.rng.random() < bowler.strike_prob:
                rolls.append(10)
            else:
                rolls.append(int(self.rng.integers(0, 11)))
        else:  # Pins remain: attempt the spare
            remaining = 10 - rolls[0]
            if self.rng.random() < bowler.spare_prob:
                rolls.append(remaining)
            else:
                rolls.append(int(self.rng.integers(0, remaining)))

        # Third roll only earned by a strike or spare in the first two rolls (fresh rack)
        if sum(rolls[:2]) >= 10:
            if self.rng.random() < bowler.strike_prob:
                rolls.append(10)
            else:
                rolls.append(int(self.rng.integers(0, 11)))

        return tuple(rolls[:3])  # Ensure only up to three rolls are returned

    def frame_by_frame_generator(self) -> Iterator[dict[str, tuple[int, ...]]]:
        """
        A generator to simulate the game frame-by-frame, yielding results for each frame for all bowlers.

        Yields:
            Iterator[dict[str, tuple[int, ...]]]: An iterator that yields a dictionary representing the frame results of each bowler.
        """
        for frame_number in range(10):
            frame_results = {}
            for bowler in self.bowlers:
                frame_results[bowler.name] = self.simulate_frame(bowler, frame_number)
            yield frame_results

    def simulate_game(self) -> dict[str, list[tuple[int, ...]]]:
        """
        Simulates a complete game for all bowlers, returning the frame-by-frame results.

        Returns:
            dict[str, list[tuple[int, ...]]]: A dictionary where keys are bowler names and values are lists of tuples, each tuple representing a frame.
        """
        results: dict[str, list[tuple[int, ...]]] = {bowler.name: [] for bowler in self.bowlers}
        for frame_results in self.frame_by_frame_generator():
            for name, frame in frame_results.items():
                results[name].append(frame)
        return results


if __name__ == "__main__":
    # Example usage:
    bowlers = [Bowler(name="John Doe", strike_prob=0.3, spare_prob=0.5),
               Bowler(name="Jane Doe", strike_prob=0.4, spare_prob=0.6)]
    alley = Alley("Strike Zone", "Synthetic", "Medium")
    game = Game(bowlers, alley)
    results = game.simulate_game()
    print("Game Results:")
    for bowler, frames in results.items():
        print(f"{bowler}: {frames}")
