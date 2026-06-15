import pytest

from virtual_lanes import Alley, Bowler, BowlingDatabase


@pytest.fixture
def db():
    """Fixture to create a new database for each test."""
    database = BowlingDatabase('test_bowling.db')
    yield database
    database.close()
    import os
    os.remove('test_bowling.db')

def test_add_bowler(db):
    """Test adding a new bowler to the database."""
    bowler = Bowler(name="John Doe", strike_prob=0.5, spare_prob=0.3, handedness="right", technique="single")
    bowler_id = db.add_bowler(bowler)
    assert bowler_id is not None
    assert isinstance(bowler_id, int)

def test_add_alley(db):
    """Test adding a new alley to the database."""
    alley = Alley(name="Main Street Lanes", location="123 Main St", lane_type="Synthetic")
    alley_id = db.add_alley(alley)
    assert alley_id is not None
    assert isinstance(alley_id, int)

def test_bowler_with_invalid_probabilities():
    """Test handling of invalid probability values."""
    with pytest.raises(ValueError):
        Bowler(name="Invalid Bowler", strike_prob=1.2, spare_prob=0.8)


def test_calculate_stats_uses_real_scoring(db):
    """A perfect game should score 300, not the old stubbed 0."""
    perfect = [(10, 0) for _ in range(9)] + [(10, 10, 10)]
    total_score, strike_pct, spare_pct = db.calculate_stats(perfect)
    assert total_score == 300
    assert strike_pct == 100.0
    assert spare_pct == 0.0


def test_add_game_persists_score_and_bowler(db):
    """add_game should store the bowler id and a computed (non-zero) total score."""
    bowler_id = db.add_bowler(Bowler(name="Scorer", strike_prob=0.5, spare_prob=0.3))
    alley_id = db.add_alley(Alley(name="Lanes", location="Town", lane_type="Wood"))
    frames = [(9, 1) for _ in range(9)] + [(9, 1, 9)]  # all spares
    game_id = db.add_game("2026-06-15", alley_id, 1, bowler_id, frames)

    cursor = db.conn.cursor()
    cursor.execute(
        "SELECT BowlerID, TotalScore FROM GameDetails WHERE GameID = ?", (game_id,)
    )
    stored_bowler_id, stored_score = cursor.fetchone()
    assert stored_bowler_id == bowler_id
    assert stored_score == 190

# Additional tests can include:
# - Test updating an existing bowler.
# - Test adding game results.
# - Test calculating statistics.
# - Test retrieving data to ensure it matches what was inserted.
# - Test deleting data.
# - Test handling of invalid data.
