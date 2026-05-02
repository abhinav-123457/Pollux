/**
 * Firestore service for election data — candidates, constituencies, results
 * Demonstrates advanced Google Firestore integration
 */

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  limit,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  constituency: string;
  image?: string;
  votes: number;
  position: number; // 1st, 2nd, 3rd...
  affidavit?: {
    age: number;
    education: string;
    assets: string;
    criminalCases: number;
  };
  socialMedia?: {
    twitter?: string;
    facebook?: string;
  };
}

export interface Constituency {
  id: string;
  name: string;
  state: string;
  totalVoters: number;
  votesPolled: number;
  votePercentage: number;
  topCandidates: Candidate[];
}

export interface ElectionResult {
  id: string;
  constituency: string;
  winner: Candidate;
  runnerUp: Candidate;
  margin: number;
  totalVotes: number;
  votes_cast_percentage: number;
  timestamp: Date;
}

/**
 * Fetch all candidates for a constituency
 */
export async function getCandidatesByConstituency(
  constituencyName: string
): Promise<Candidate[]> {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }

  try {
    const candidatesRef = collection(db, 'candidates');
    const q = query(
      candidatesRef,
      where('constituency', '==', constituencyName),
      orderBy('votes', 'desc'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as DocumentData),
      id: doc.id,
    })) as Candidate[];
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return [];
  }
}

/**
 * Fetch top candidates nationally
 */
export async function getTopCandidates(count: number = 10): Promise<Candidate[]> {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }

  try {
    const candidatesRef = collection(db, 'candidates');
    const q = query(
      candidatesRef,
      orderBy('votes', 'desc'),
      limit(count)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as DocumentData),
      id: doc.id,
    })) as Candidate[];
  } catch (error) {
    console.error('Error fetching top candidates:', error);
    return [];
  }
}

/**
 * Fetch constituency information
 */
export async function getConstituency(
  constituencyName: string
): Promise<Constituency | null> {
  if (!db) {
    console.warn('Firebase not initialized');
    return null;
  }

  try {
    const constituencyRef = doc(db, 'constituencies', constituencyName);
    const snapshot = await getDoc(constituencyRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as DocumentData;
    return {
      id: snapshot.id,
      name: data.name,
      state: data.state,
      totalVoters: data.totalVoters,
      votesPolled: data.votesPolled,
      votePercentage: data.votePercentage,
      topCandidates: data.topCandidates || [],
    };
  } catch (error) {
    console.error('Error fetching constituency:', error);
    return null;
  }
}

/**
 * Search constituencies by state
 */
export async function getConstituenciesByState(state: string): Promise<Constituency[]> {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }

  try {
    const constituenciesRef = collection(db, 'constituencies');
    const q = query(constituenciesRef, where('state', '==', state));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as DocumentData),
      id: doc.id,
    })) as Constituency[];
  } catch (error) {
    console.error('Error fetching constituencies:', error);
    return [];
  }
}

/**
 * Fetch election results
 */
export async function getElectionResults(limit_count: number = 100): Promise<ElectionResult[]> {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }

  try {
    const resultsRef = collection(db, 'election_results');
    const q = query(
      resultsRef,
      orderBy('timestamp', 'desc'),
      limit(limit_count)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        constituency: data.constituency,
        winner: data.winner,
        runnerUp: data.runnerUp,
        margin: data.margin,
        totalVotes: data.totalVotes,
        votes_cast_percentage: data.votes_cast_percentage,
        timestamp: data.timestamp?.toDate() || new Date(),
      };
    }) as ElectionResult[];
  } catch (error) {
    console.error('Error fetching election results:', error);
    return [];
  }
}

/**
 * Get candidate profile with detailed information
 */
export async function getCandidateProfile(candidateId: string): Promise<Candidate | null> {
  if (!db) {
    console.warn('Firebase not initialized');
    return null;
  }

  try {
    const candidateRef = doc(db, 'candidates', candidateId);
    const snapshot = await getDoc(candidateRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      ...(snapshot.data() as DocumentData),
      id: snapshot.id,
    } as Candidate;
  } catch (error) {
    console.error('Error fetching candidate profile:', error);
    return null;
  }
}

/**
 * Get election statistics
 */
export async function getElectionStats(): Promise<{
  totalConstituencies: number;
  totalCandidates: number;
  totalVoters: number;
  voterTurnout: number;
} | null> {
  if (!db) {
    console.warn('Firebase not initialized');
    return null;
  }

  try {
    const statsRef = doc(db, 'election_stats', 'current');
    const snapshot = await getDoc(statsRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as DocumentData;
    return {
      totalConstituencies: data.totalConstituencies || 0,
      totalCandidates: data.totalCandidates || 0,
      totalVoters: data.totalVoters || 0,
      voterTurnout: data.voterTurnout || 0,
    };
  } catch (error) {
    console.error('Error fetching election stats:', error);
    return null;
  }
}
