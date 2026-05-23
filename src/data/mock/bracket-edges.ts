import type { BracketData } from "@/lib/api/types";

export const MOCK_BRACKET: BracketData = {
  stages: [
    { stage: "round_of_32", name: "Round of 32", fixtureIds: [400021518, 400021513, 400021516] },
    { stage: "round_of_16", name: "Round of 16", fixtureIds: [400021530] },
    { stage: "quarter_final", name: "Quarter Finals", fixtureIds: [400021536] },
    { stage: "semi_final", name: "Semi Finals", fixtureIds: [400021541] },
    { stage: "third_place", name: "Third Place", fixtureIds: [400021542] },
    { stage: "final", name: "Final", fixtureIds: [400021543] },
  ],
  edges: [
    { id: 1, parentFixtureId: 400021518, childFixtureId: 400021530, childSlot: "home", parentOutcome: "winner" },
    { id: 2, parentFixtureId: 400021513, childFixtureId: 400021530, childSlot: "away", parentOutcome: "winner" },
    { id: 3, parentFixtureId: 400021530, childFixtureId: 400021536, childSlot: "home", parentOutcome: "winner" },
    { id: 4, parentFixtureId: 400021536, childFixtureId: 400021541, childSlot: "home", parentOutcome: "winner" },
    { id: 5, parentFixtureId: 400021541, childFixtureId: 400021543, childSlot: "home", parentOutcome: "winner" },
    { id: 6, parentFixtureId: 400021541, childFixtureId: 400021542, childSlot: "home", parentOutcome: "loser" },
  ],
};
