interface SearchData {
  id: string;
  timestamp: number;
  tailNumber: string;
  flightDate: string;
  location?: string;
  partNumber?: string;
}

const SEARCH_HISTORY_KEY = 'aog_search_history';

export function logSearch(searchData: Omit<SearchData, 'id' | 'timestamp'>): void {
  const existingHistory = getSearchHistory();
  const newSearch: SearchData = {
    ...searchData,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
  };
  const updatedHistory = [newSearch, ...existingHistory].slice(0, 100); // Keep last 100 searches
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
}

export function getSearchHistory(): SearchData[] {
  const historyString = localStorage.getItem(SEARCH_HISTORY_KEY);
  return historyString ? JSON.parse(historyString) : [];
}

export function getSearchById(id: string): SearchData | undefined {
  const history = getSearchHistory();
  return history.find(item => item.id === id);
}

