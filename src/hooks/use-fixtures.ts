"use client";

import { useEffect, useState, useCallback } from "react";
import type { Fixture, FixtureFilters } from "@/lib/api/types";
import { getWorldCupFixtures } from "@/lib/api";

export function useFixtures(initialFilters?: FixtureFilters) {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FixtureFilters | undefined>(initialFilters);

  const load = useCallback(async (f?: FixtureFilters) => {
    setLoading(true);
    const data = await getWorldCupFixtures(f ?? filters);
    setFixtures(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    load(filters);
  }, [filters, load]);

  return { fixtures, loading, filters, setFilters, reload: load };
}
